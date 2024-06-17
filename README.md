# Inserting the weather for users when looking up National Trust houses

## Project Description

This project was created to be easily inserted into the National Trust’s (NT’s) site, to show users the weather for the houses on their pages. The weather displayed is that day and then the next 2 days and only displays weather for times when the NT house is open (up until 6pm).

To create this project, I have used purely JS and so it can be inserted into the NT’s site using a code snippet. This allows for ‘non-technical’ users to add the code simply and complete A/B testing to determine the effectiveness of this project. The JS file utilises existing CSS classes to ensure styling is the same throughout the page, allowing for a good user flow. This project also stores the returned weather from the fetch request in session storage. The reason for this is so that there are not multiple, unnecessary API calls as this can be costly to the provider. I have not stored anything in local storage for this as a user would have to manually clear their local storage and so the weather would not update when a session was to ‘restart’ (aka a user refreshed their page or opened the page again from a new session), a benefit of using session storage.

To handle any errors, I have included a try/catch within the fetch request, which returns an error message in the console if there are any issues. Furthering this, I have also included a unit test, to ensure that my function that filters the weather object returned from the API is correct. This function is vital to ensure that users are given the correct weather.

To plan this project, I have also utilised Figma. This board allowed me to visualise the user’s flow and journey and to keep focused on my MVP for this project. To see my Figma, please follow this link :
[Figma planning board](https://www.figma.com/board/NKMc3qB1R5wNTMHmryfBX5/Green-Growth-Planning?node-id=0-1&t=legRyRwGErh1Di2y-1)

During this project, I have faced some challenges. These challenges included finding the latitude and longitude from the National Trust’s site. Initially, I checked the session and local storage and the network requests. Then when looking through the DOM, I saw a map component, showing users exactly where the house is using lat and long and so extracted this.

Further aims of this project would be to have the weather display the day instead. Meaning that “Today, Tomorrow, the next day” would be “Monday, Tuesday, Wednesday”. This is because it would make it more clear for the users which day the weather is referring to. As well as this, from an accessibility standpoint, I would like the cloud icons to be clearer against the background (the light-grey and white are not very accessible), to help improve this, I would look at adding a different photo source. Furthermore, to make it more ‘obvious’ which day the user is clicked on, I would have there be a difference between that and the other buttons, either by only having the selected button have a green border bottom or by having a bold font.

## How to Install and Run the Project

To use this project on your own computer, you will need to clone this down into your own repo.
Once cloned, to run my unit test, you will need to install the dependencies and then run “npm run test” to run Vitest.

```bash
npm install
```

```bash
npm run test
```

A simple way to see how this code looks within a NT house site is to copy and paste the index.js code into Chrome code snippets and run this. This will show you the weather of that specific house in a simple drop down.
