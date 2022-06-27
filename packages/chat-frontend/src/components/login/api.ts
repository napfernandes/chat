import axios from 'axios';

import { LoginFormData } from './types';

const defaultHeader = { 'Content-Type': 'application/json' };

export async function loginWithCredentials(formData: LoginFormData) {
  const query = `mutation login($input: LoginCredentialsInput!) {
    login(input: $input) { token }
  }`;
  const variables = { input: formData };
  const queryData = JSON.stringify({ query, variables });

  const { data } = await axios.post('http://localhost:3001/graphql', queryData, {
    headers: defaultHeader,
  });

  if (Array.isArray(data.errors) && data.errors.length > 0) {
    throw data.errors[0];
  }

  return data.data.login;
}
