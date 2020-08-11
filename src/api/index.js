const users = [
  {
    id: 'user1', password: 'pass1', token: 'test1', name: 'John Doe',
    keywords: ['react', 'redux', 'node.js']
  },
  {
    id: 'user2', password: 'pass2', token: 'test2', name: 'Jane Doe',
    keywords: ['jquery', 'css', 'html']
  },
  {
    id: 'user3', password: 'pass3', token: 'test3', name: 'Jake Doe',
    keywords: ['android', 'potter', 'voldemort']
  },
];

export const auth = ({ username, password }) => new Promise(resolve => {
    setTimeout(() => {
      const user = username && password && users.find( o =>
        o.id === username && o.password === password
      );
      if (user)
        resolve( {ok: true, token: user.token} );
      else
        resolve( {ok: false, message: 'Wrong username or password'} );
    }, 1000);
});

export const fetchProfile = token => new Promise(resolve => {
    setTimeout(() => {
      const user = token && users.find( o => o.token === token );
      if (user) {
        const {name, keywords} = user;
        resolve( { ok: true, data: {name, keywords} } );
      }
      else {
        resolve( {ok: false} );
      }
    }, 1000);
});
