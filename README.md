## Mona Ueno

## TodayPay!

### Elevator Pitch

As a college student, there are many bills I need to pay such as rent, student loans, groceries, etc; however, I only receive my paycheck every two weeks, making it hard to pay these bills on time. TodayPay would be partnered with companies to help fix this problem! TodayPay is a time clock app where it allows employees to clock in and out, then are able to see and get their money in real time! With a sleek and easy design to clock in and out, this will improve the productivity of employees and stimulate positive reinforcement. 

# Here are the 7 technologies I need to use:

**HTML -** Uses correct HTML structure for application. Three HTML pages. One for login, one for clocking in, and one for the page after you pay roll. 

**CSS -** Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.

**JavaScript -** Provides login, clock display, shows the pay, display other users clock in schedules.

**React -** Single page application with views componentized and reactive to user's actions.

**Service -** Backend service with endpoints for:
retreiving time
submitting pay
retrieving time status

**DB/Login -** Employee users and time database. Register and login users. Credentials securely stored in database. Can't clock in/out unless authenticated.

**WebSocket -** As each user clocks in and out, it is broadcasted to all the users. 

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

## CSS - what I learned from my startup.

### I learned how to do the sections:


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


### I also learned how to make the background a picture.

background-image: url('https://github.com/user-attachments/assets/fcc6a15e-cb78-40ce-8f2d-6ae623fa0244');
background-size: cover;
background-position: center;
background-repeat: no-repeat;


