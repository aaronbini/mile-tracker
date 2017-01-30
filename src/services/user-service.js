userService.$inject = ['tokenService', '$http', 'apiUrl'];

export default function userService(token, $http, apiUrl) {

  const current = token.get();
  if (current) {
    $http
      .get(`${apiUrl}/auth/verify`)
      .catch(() => token.remove());
  }

  function getMe () {
    return $http.get(`${apiUrl}/users/byID`)
      .then(result => result.data);
  }
    
  function credential(endpoint) {
    return (credentials) => {
      return $http.post(`${apiUrl}/auth/${endpoint}`, credentials)
        .then(result => {
          token.set(result.data.token);
        })
        .catch(err => {
          throw err.data; 
        });
    };
  }

  return {
    isAdmin () {
      return getMe()
        .then(user => user.role === 'superUser');
    },
    isAuthenticated() {
      return !!token.get();
    },
    logout() {
      token.remove();
    },
    signin: credential('signin'),
    signup: credential('signup'),
    getMe
  };
}