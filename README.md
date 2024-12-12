# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
# TodayPay! by Mona Ueno

## Elevator Pitch

As a college student, there are many bills I need to pay such as rent, student loans, groceries, etc; however, I only receive my paycheck every two weeks, making it hard to pay these bills on time. TodayPay would be partnered with companies to help fix this problem! TodayPay is a time clock app where it allows employees to clock in and out, then are able to see and get their money in real time! With a sleek and easy design to clock in and out, this will improve the productivity of employees and stimulate positive reinforcement. 

## Here are the 7 technologies I will use:

- [x] HTML: Uses correct HTML structure for application. Three HTML pages. One for login, one for clocking in, and one for the page after you pay roll. 

- [x] CSS: Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.

- [x] JavaScript: Provides login, clock display, shows the pay, display other users clock in schedules.

- [x] React: Single page application with views componentized and reactive to user's actions.

- [x] Service: Backend service with endpoints for:
retreiving time
submitting pay
retrieving time status

- [x] DB/Login: Employee users and time database. Register and login users. Credentials securely stored in database. Can't clock in/out unless authenticated.

- [x] WebSocket: As each user clocks in and out, it is broadcasted to all the users. 

## Key features

-Secure login over HTTPS

-Ability to record time of clock in/out

-Display of other users time stamps

-Ability to see your pay

-Totals all the pay you've made so far

Ability for see their money real time

Time stamps and pay are persistently stored

## **Pay Roll Screen Rough Draft**

![payroll sheet.](https://github.com/user-attachments/assets/cd7e7a59-80fc-4ea7-8399-28d9719b356a)

## **Time Clock Screen Rough Draft**
![timeclock sheet](https://github.com/user-attachments/assets/709d0a92-f3d0-430d-855f-a962c0784193)

## HTTP - what I learned from my startup.

I learned how to make input boxes: <div> <span>*</span>
<input type="text" placeholder="placeholder">
</div>

I also learned how to make a table:
<table>
  <thead>
    <tbody>
      <tr>
        <td>first column</td>
        <td>second column</td>
        <td>third column</td>
      </tr>
      <tr>
        <td>second row</td>
        <td>second row</td>
        <td>second row</td>
      </tr>
    </tbody>
  </thead>
</table>

#### What I accomplished in HTML
- [x] Four HTML pages
- [x] Links: the login page automatically links to the clock in page
- [x] Images: I added an image to the Preferences page
- [x] DB/Login: Input box and submit button for login
- [x] WebSocket: The time and clock in is realtime

## CSS - what I learned from my startup.

##### I learned how to do the sections:


.left-section{
  background-image: url('https://github.com/user-attachments/assets/fcc6a15e-cb78-40ce-8f2d-6ae623fa0244');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}


.right-section{
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding:20px;
}


##### I also learned how to make the background a picture.

background-image: url('https://github.com/user-attachments/assets/fcc6a15e-cb78-40ce-8f2d-6ae623fa0244');
background-size: cover;
background-position: center;
background-repeat: no-repeat;

#### What I accomplished in CSS 
- [x] Header, footer, and main content body
- [x] Navigation: I changed the color and made it centered
- [x] Responsive to window resizing: I added flex in all my windows
- [x] Application elements: I tried to add a background picture to make there be not as much whitespace, although the background picture is kinda blurry
- [x] Application text content: I used sans-serif for all the text
- [x] Application images: not as much styling as I could have done, but i centered the image on the preferences page

## React
- [x] Bundled and transpiled!
- [x] Components - Login, Clock in, mypay
  - [x] login - when you press login, it takes you to the home page
  - [x] clockin -  displays the times you clockin and out
  - [x] mypay - logs the amount of money made that shift
  - [x] I tried to make the money reset every day, but it didn't work:(
- [x] Router: routing between login and timeclock

## Service deliverable
I added backend endpoints that receives other employees clockin/out times.

- [x] Node.js/Express HTTP service -done!
- [x] Static middleware for frontend - done!
- [x] Calls to third party endpoints - don't have any, but would eventually love to involve payment processing
- [x] Backend service endpoints - placeholders for login and for time logging
- [x] Frontend calls service endpoints - I did this using the fetch function  

