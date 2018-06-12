import 'whatwg-fetch';

export class HttpWrapper {
  get(url: string) {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json());
  }

  post(url: string, body: any) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body
    })
      .then(response => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json());
  }

  put(url: string, body: any) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body
    })
    .then(response => {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      return response;
    })
    .then(response => response.json());
  }

  delete(url: string) {
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      return response;
    })
    .then(response => response.json());
  }
}