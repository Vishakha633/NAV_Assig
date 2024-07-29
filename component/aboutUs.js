// import React from 'react';
 
// const AboutUs = () => (
//   <div>
//     <h1>About Us Page</h1>
//   </div>
// );
 
// export default AboutUs;
// import React from 'react';
// import { Card, Layout } from 'antd';

// import './aboutUs.css';
 
// const { Content } = Layout;
 
// const AboutUs = () => {
//   return (
//     <Content className="about-us-content">
//       <Card title="About the User Form" className="about-us-card">
//         <p>
//           The User Form is designed to capture comprehensive user information including first name, last name, email, company, country, state, city, mobile number, team, and department. The form includes the following features:
//         </p>
//         <ul>
//           <li>First Name and Last Name: Input fields that accept only alphabets and are limited to 26 characters.</li>
//           <li>Email: Input field that validates the correct email format.</li>
//           <li>Company, City, Team, and Department: Simple input fields without specific constraints.</li>
//           <li>Country and State: Dropdowns populated dynamically from an API with search functionality. The State dropdown is dependent on the selected Country.</li>
//           <li>Mobile Number: An input field that auto-fills the country dial code and accepts only numeric values, exactly 10 characters long.</li>
//         </ul>
//       </Card>
//       <Card title="About the User Table" className="about-us-card">
//         <p>
//           The User Table displays the information collected from the User Form in a structured and searchable format. It includes the following features:
//         </p>
//         <ul>
//           <li>Search Bar: Allows users to search for specific entries within the table.</li>
//           <li>Pagination: Provides easy navigation through large sets of user data.</li>
//           <li>Edit and Delete: Buttons for editing or deleting individual entries directly from the table.</li>
//           <li>Real-time Updates: Automatically updates the table when a new entry is submitted, edited, or deleted.</li>
//         </ul>
//       </Card>
//     </Content>
//   );
// };
 
// export default AboutUs;


import React from 'react';
import { Collapse, Layout } from 'antd';
import './aboutUs.css';
 
const { Content } = Layout;
const { Panel } = Collapse;
 
const AboutUs = () => {
  return (
    <Content className="about-us-content">
      <Collapse className="about-us-collapse" accordion>
        <Panel header="About the User Form" key="1" className="about-us-card">
         
          <p>
            The User Form is designed to capture comprehensive user information, including the following features:
          </p>
          <ul>
            <li>First Name and Last Name: Input fields that accept only alphabets and are limited to 26 characters.</li>
            <li>Email: Input field that validates email format.</li>
            <li>Company: Input field for the company name.</li>
            <li>Country and State: Dropdowns that fetch data from APIs, with the state dropdown depending on the selected country.</li>
            <li>City: Input field for the city name.</li>
            <li>Dial Code and Mobile Number: Input field that auto-sets the dial code based on the selected country and accepts only numeric values with a length of 10 characters.</li>
            <li>Team and Department: Input fields for team and department information.</li>
          </ul>
         
        </Panel>
        <Panel header="About the User Table" key="2" className="about-us-card">
          <p>
            The User Table is designed to display the submitted user information in a structured format, with the following features:
          </p>
          <ul>
            <li>Search Functionality: Allows searching through the user data.</li>
            <li>Pagination: Enables navigating through multiple pages of user entries.</li>
            <li>Edit and Delete: Provides options to edit or delete user entries.</li>
            <li>Real-Time Updates: Automatically updates the table on edit, delete, and submit actions.</li>
          </ul>
        </Panel>
      </Collapse>
    </Content>
  );
};
 
export default AboutUs;


