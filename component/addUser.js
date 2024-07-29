import React, { useState } from "react";
import _ from "lodash";
import { Form, Input, Button, Select, Row, Col, notification } from "antd";
// import axios from 'axios';
// import 'antd/dist/antd.css';
// import './index.css';
import { Country, State, City } from "country-state-city";

const { Option } = Select;

const AddUser = () => {
  const [form] = Form.useForm();
  //   const [countries, setCountries] = useState([]);
  const [selectCountry] = useState("");
  //   console.log(selectCountry);
  //   const [states, setStates] = useState([]);
  const [selectedState] = useState("");
  const [selectedCity] = useState("");
  const prevData = localStorage.getItem("users");
  console.log("prevData", prevData);
  const arrayPrevData = JSON.parse(prevData);
  const [formData, setFormData] = useState(arrayPrevData ?? []);
  console.log(formData);
  const [phnCode, setphnCode] = useState([]);
  const [stateList, setStateList] = useState(State.getAllStates());
  const [cityList, setcityList] = useState(City.getAllCities());
  const newCountries = Country.getAllCountries();
  const statess = State.getAllStates();
  const cities = City.getAllCities();
  // const countryCodes = require('country-codes-list')
  // const myCountryCodesObject = countryCodes.customList('countryCode', '[{countryCode}] {countryNameEn}: +{countryCallingCode}')
  type NotificationType = "success";

  const handleCountryChange = (value) => {
    // console.log(value)

    const newStateList = statess.filter(
      (pikapi) => pikapi.countryCode === value.key
    );
    const newcities = cities.filter((obj) => obj.countryCode === value.key);

    setcityList(newcities);
    // const myCountryCodesObject = value('+{countryCallingCode}')
    // console.log("this is cities", newCityList)
    const val = newCountries.find((obj) => value.key === obj.isoCode);

    // console.log("this is val", val.phonecode)
    setStateList(newStateList);

    setphnCode(val.phonecode);
  };
  const handleStateChange = (value) => {
    console.log("these are values", value);
    console.log(statess);
    const newCityList = cityList.filter((obj) => obj.stateCode === value.key);
    console.log("THis is Cities : ", newCityList);
    // const data = City.getCitiesOfState(value.key, value.isoCode).map(city => ({
    //     value: city.name,
    //     displayValue: city.name
    // }))
    // console.log(data)
    setcityList(newCityList);
  };
  const openNotificationWithIcon = (type: NotificationType) => {
    notification[type]({
      message: "Thank You",
      description: "The Form has been submitted successfully!!",
    });
  };
  const onFinish = (values) => {
    // debugger
    const canAdd = formData.find((obj) => obj.firstName === values.firstName);
    if (_.isEmpty(formData) || _.isUndefined(canAdd)) {
      const newUser = { ...values, key: Date.now() };
      const newData = [...formData, newUser];
      setFormData(newData);
      console.log("newData=>", newData);
      localStorage.setItem("users", JSON.stringify(newData));
      form.resetFields();
      openNotificationWithIcon("success");
    } else alert("Can't create new user with same fisrt name.");
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              {
                required: true,
                message: "Please input your first name!",
                pattern: /^[A-Za-z]+$/,
                max: 26,
              },
            ]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              {
                required: true,
                message: "Please input your last name!",
                pattern: /^[A-Za-z]+$/,
                max: 26,
              },
            ]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="email"
            label="Email Id"
            rules={[
              {
                required: true,
                message: "Please input your email!",
                type: "email",
              },
            ]}
          >
            <Input placeholder="Email Id" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="company"
            label="Company"
            rules={[{ required: true, message: "Please input your company!" }]}
          >
            <Input placeholder="Company" />
          </Form.Item>
          {/* console.log(company.name); */}
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="country"
            label="Country"
            rules={[{ required: true, message: "Please select your country!" }]}
          >
            <Select
              showSearch
              allowClear
              placeholder="Select a country"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.value.toLowerCase().includes(input)
              }
              // filterSort={(optionA, optionB) =>
              //     (optionA?.value ?? '').toLowerCase().localeCompare((optionB?.value ?? '').toLowerCase())
              // }
              value={selectCountry ? selectCountry : null}
              onSelect={(key, value) => handleCountryChange(value)}
            >
              onChange={handleCountryChange}
              {newCountries.map((country) => (
                <Option key={country.isoCode} value={country.name}>
                  {" "}
                  {country.name}
                </Option>
              ))}
              {/* <Input placeholder="Select a country" /> */}
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="state"
            label="State"
            rules={[{ required: true, message: "Please select your state!" }]}
          >
            <Select
              showSearch
              allowClear
              placeholder="Select a state"
              value={selectedState}
              onSelect={(key, value) => handleStateChange(value)}
            >
              value={selectedState ? selectedState : null}
              {stateList.map((state) => (
                <Option key={state.isoCode} value={state.name}>
                  {state.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="city"
            label="City"
            rules={[{ required: true, message: "Please input your city!" }]}
          >
            <Select
              showSearch
              allowClear
              placeholder="Select a City"
              value={selectedCity}
              // optionFilterProp="children"
              // filterOption={(input, option) => option.value.toLowerCase().includes(input) }
            >
              value={selectedCity ? selectedCity : null}
              {cityList.map((city) => (
                <Option key={city.name} value={city.name}>
                  {city.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="mobileNumber"
            label="Mobile Number"
            rules={[
              {
                required: true,
                message: "Please input your mobile number!",
                pattern: /^\d{10}$/,
              },
              { max: 10, message: "Phone number cannot be greater than 10" },
            ]}
          >
            <Input addonBefore={`+${phnCode}`} placeholder="Mobile Number" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="team"
            label="Team"
            rules={[{ required: true, message: "Please input your Team!" }]}
          >
            <Input placeholder="Team" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="department"
            label="Department"
            rules={[
              { required: true, message: "Please input your department!" },
            ]}
          >
            <Input placeholder="Department" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default AddUser;
