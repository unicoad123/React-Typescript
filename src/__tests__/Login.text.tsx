import React from 'react';
import { render, screen } from '@testing-library/react';
import Login,{Props} from '../pages/Auth/Login';

function renderLoginForm(props:Partial<Props>={}){
  const defaultProps:Props={
    usernameHandler(){
      return;
    },
    passwordHandler(){
      return;
    },
    onSubmit(){
      return;
    }

  }

  return render(<Login {...defaultProps}/>);
}
  