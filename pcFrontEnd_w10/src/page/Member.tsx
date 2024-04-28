import React, { useContext, useEffect, useRef, useState } from "react";
import type { GetRef, InputRef } from "antd";
import {
  Button,
  Form,
  Input,
  Popconfirm,
  Table,
  Modal,
  Radio,
  message,
} from "antd";
import "../css/Member.css";
import axios from "axios";

type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableRowProps {
  index: number;
}

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  name: string;
  age: string;
  address: string;
}

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

const App: React.FC = () => {
  const [form] = Form.useForm();
  const [editingItem, setEditingItem] = useState({ id: "" });
  const [modalTitle, setModalTitle] = useState("Add User");
  const [messageApi, contextHolder] = message.useMessage();
  const [dataSource, setDataSource] = useState([
    {
      id: "",
      username: "",
      password: "",
      role: "",
      avatarID: "",
      orders: "",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  async function getStudents() {
    const resp = await axios.get("http://localhost:8088/user/findAll");
    console.log(resp);
    setDataSource(resp.data);
    // setStudents(resp.data)
    // setLoading(false)
  }
  useEffect(() => {
    getStudents();
  }, []);

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    let currentUserId = localStorage.getItem("currentUserId");
    if (modalTitle === "Edit User") {
      let user = {
        username: values.username,
        password: values.password,
        role: values.role,
        id: editingItem.id,
      };
      const resp = await axios.post(
        "http://localhost:8088/api/admin/updateMember?currentUserId=" +
          currentUserId,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (resp.data == "Username is already") {
        messageApi.info("Username is already");
      } else {
        messageApi.info("success");
        setIsModalOpen(false);
        getStudents();
      }
    } else {
      let user = {
        username: values.username,
        password: values.password,
        role: values.role,
      };
      const resp = await axios.post(
        "http://localhost:8088/api/admin/addMember?currentUserId=" +
          currentUserId,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (resp.data == "Username is already taken") {
        messageApi.info("Username is already ");
      } else {
        messageApi.info("success");
        setIsModalOpen(false);
        getStudents();
      }
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleDelete = async (key: any) => {
    const resp = await axios.delete(
      "http://localhost:8088/api/admin/deleteMember/" +
        key.id +
        "/" +
        localStorage.getItem("currentUserId")
    );

    messageApi.info("success");
    getStudents();
  };

  const handleEdit = (key: any) => {
    setEditingItem(key);
    form.setFieldsValue(key);
    setIsModalOpen(true);
    setModalTitle("Edit User");
  };

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "username",
      dataIndex: "username",
      width: "30%",
    },
    {
      title: "password",
      dataIndex: "password",
    },
    {
      title: "role",
      dataIndex: "role",
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <div>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record)}
            >
              <a>Delete</a>
            </Popconfirm>
            <a
              style={{ marginLeft: "10px" }}
              onClick={() => handleEdit(record)}
            >
              Edit
            </a>
          </div>
        ) : null,
    },
  ];

  const handleAdd = () => {
    form.resetFields();
    setModalTitle("Add User");
    setIsModalOpen(true);
  };

  const components = {
    body: {
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });

  return (
    <div className="member_main">
      {contextHolder}
      <Modal
        destroyOnClose={true}
        title={modalTitle}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        forceRender={true}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          form={form}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please select your role!" }]}
          >
            <Radio.Group>
              <Radio.Button value="user">user</Radio.Button>
              <Radio.Button value="caseWorker">caseWorker</Radio.Button>
              <Radio.Button value="admin">admin</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add User
      </Button>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
    </div>
  );
};

export default App;
