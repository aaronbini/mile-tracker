import * as React from 'react';

interface Props {
  login: (creds: any) => any;
}

export const Signin: React.StatelessComponent<Props> = ({ login }) => {
  //should this be handled via state?
  const creds = {
    email: '',
    password: ''
  }

  function handleUsernameChange(event) {
    creds.email = event.target.value;
  }

  function handlePasswordChange(event) {
    creds.password = event.target.value;
  }

  function handleSubmit(event) {
    event.preventDefault();
    login(creds);
  }

  return (
    <div>
      Signin Page
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input name="email" type="text" onChange={handleUsernameChange}/>
        <label htmlFor="password">Password: </label>
        <input name="password" type="password" onChange={handlePasswordChange}/>
        <input type="submit" value="Signin" />
      </form>
    </div>
  )
}
