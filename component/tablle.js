import {
  Button,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  Select,
  notification,
  Pagination,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import React, { useRef, useState, useEffect } from "react";
import { Space } from "antd";
import Highlighter from "react-highlight-words";

const { Option } = Select;
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const { Search } = Input;

const Tablle = () => {
  const storedUserData = localStorage.getItem("users");
  let arrayData = JSON.parse(storedUserData);
  // arrayData = arrayData.map((data,index)=>({
  //   key: index.toString(),
  //   ...data
  // }));
  console.log(arrayData);

  const [form] = Form.useForm();
  const [data, setData] = useState(arrayData);
  const [editingKey, setEditingKey] = useState("");
  const [value, setValue] = useState("");
  // const [selectSt] = useState('');
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const [filteredData, setFilteredData] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [check, setCheck] = useState(false);
  // const [searchText, setSearchText] = useState('');

  // useEffect(() => {
  // Load data from local storage
  // const storedData = JSON.parse(localStorage.getItem('users')) || [];
  // setData(storedData);
  // setFilteredData(storedData);
  // }, []);

  const onSearch = (value) => {
    console.log("search:", value);
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
    console.log(dataIndex);
  };

  const handleReset = () => {
    setSearchText("");
    setSearchField("");
    setFilteredData(data);
    setCheck(false);
  };

  const handleSsearch = () => {
    console.log(searchField);
    const filteredd = data.filter((user) =>
      user[searchField].toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(filteredd.slice(0, 1));
    setCheck(true);
    if (filteredd[0].firstName === searchText) {
      // setSearchText(filteredd[0]);
      setSearchedColumn(filteredd[0].key);

      <Highlighter
        highlightStyle={{
          backgroundColor: "#ffc069",
          padding: 0,
        }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={searchText ? searchText.toString() : ""}
      />;
    }
    console.log(searchText);
    console.log(filteredd.slice(0, 1));
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={`${selectedKeys[0] || ""}`}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>

          <Button
            type="link"
            size="small"
            onClick={() => {
              clearFilters();
              setSearchText("");
              confirm({
                closeDropdown: false,
              });
              // setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
  };

  const handleDelete = (key) => {
    console.log("this is key", key);
    const newData = data.filter((item) => item.firstName !== key);
    setData(newData);
    localStorage.setItem("users", JSON.stringify(newData));
  };
  type NotificationType = "success";
  const openNotificationWithIcon = (type: NotificationType) => {
    notification[type]({
      message: "Thank You",
      description: "Your submission has been saved!!",
    });
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          key: index,
          ...item,
          ...row,
        });
        console.log(newData);
        setData(newData);
        // console.log("Edit Successfully");
        localStorage.setItem("users", JSON.stringify(newData));
        openNotificationWithIcon("success");
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        localStorage.setItem("users", JSON.stringify(newData));
        // console.log("Edit Successfully");
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      width: "10%",
      editable: true,
      ...getColumnSearchProps("firstName"),
      render: (text) => (
        <Highlighter
          highlightClassName="highlight"
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      width: "10%",
      editable: true,
      ...getColumnSearchProps("lastName"),
      render: (text) => (
        <Highlighter
          highlightClassName="highlight"
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ),
    },
    {
      title: "Email-Id",
      dataIndex: "email",
      ...getColumnSearchProps("email"),
      render: (text) => (
        <Highlighter
          highlightClassName="highlight"
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ),
      width: "10%",
      editable: true,
    },
    {
      title: "Company",
      dataIndex: "company",
      ...getColumnSearchProps("company"),
      render: (text) => (
        <Highlighter
          highlightClassName="highlight"
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ),
      width: "10%",
      editable: true,
    },
    {
      title: "Country",
      dataIndex: "country",
      ...getColumnSearchProps("country"),
      render: (text) => (
        <Highlighter
          highlightClassName="highlight"
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ),
      width: "10%",
      editable: true,
    },
    {
      title: "State",
      dataIndex: "state",
      ...getColumnSearchProps("state"),
      render: (text) => (
        <Highlighter
          highlightClassName="highlight"
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ),
      width: "10%",
      editable: true,
    },
    {
      title: "City",
      dataIndex: "city",
      ...getColumnSearchProps("city"),
      render: (text) => (
        <Highlighter
          highlightClassName="highlight"
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ),
      width: "10%",
      editable: true,
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      ...getColumnSearchProps("mobileNumber"),
      render: (text) => (
        <Highlighter
          highlightClassName="highlight"
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ),
      width: "10%",
      editable: true,
    },
    {
      title: "Team",
      dataIndex: "team",
      ...getColumnSearchProps("team"),
      render: (text) => (
        <Highlighter
          highlightClassName="highlight"
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ),
      width: "10%",
      editable: true,
    },
    {
      title: "Department",
      dataIndex: "department",
      ...getColumnSearchProps("department"),
      render: (text) => (
        <Highlighter
          highlightClassName="highlight"
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ),
      width: "10%",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
              {/* Cancel */}
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) =>
        data?.length >= 1
          ? (console.log("records", record),
            (
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => handleDelete(record.firstName)}
              >
                <a>Delete</a>
              </Popconfirm>
            ))
          : null,
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Select
        style={{ width: 255 }}
        showSearch
        allowClear
        placeholder="Select"
        // optionFilterProp="label"
        onChange={(value) => setSearchField(value)}
        value={searchField}
      >
        <Option value="" disabled>
          Select
        </Option>
        <Option value="firstName">First Name</Option>
        <Option value="lastName">Last Name</Option>
        <Option value="email">Email</Option>
        <Option value="company">Company</Option>
        <Option value="country">Country</Option>
        <Option value="state">State</Option>
        <Option value="city">City</Option>
        <Option value="dialCode">Dial Code</Option>
        <Option value="mobileNumber">Mobile Number</Option>
        <Option value="team">Team</Option>
        <Option value="department">Department</Option>
      </Select>

      <Input
        style={{ width: 255, margin: 2, radius: 0 }}
        placeholder="Please input"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Button onClick={handleSsearch} type="primary" style={{ margin: 2 }}>
        Search
      </Button>
      <Button onClick={handleReset} type="primary" style={{ margin: 2 }}>
        Reset
      </Button>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={check === false ? data : filteredData}
        columns={mergedColumns}
        rowClassName="editable-row"
        // pagination={{
        //   onChange: cancel,
        // }}
        pagination={{
          pageSize: 10,
        }}
      />
      {/* <Pagination defaultCurrent={6} total={500} /> */}
    </Form>
  );
};
export default Tablle;
