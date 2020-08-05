describe('Blog ', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Weird Beard',
      username: 'root',
      password: 'sekret',
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  describe('Basic testing', function () {
    it('front page can be opened', function () {
      cy.visit('http://localhost:3000');
      cy.contains('Blogs');
      cy.contains('Blog app by Weird Beard');
    });
  });

  describe('Login', function () {
    it('login form is shown', function () {
      cy.contains('login').click();
    });

    it('user can log in', function () {
      cy.contains('login').click();
      cy.get('#username').type('root');
      cy.get('#password').type('sekret');
      cy.get('#login-button').click();

      cy.contains('logged in as Weird Beard');
    });

    it('login fails with wrong password', function () {
      cy.contains('login').click();
      cy.get('#username').type('root');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();

      cy.contains('wrong username or password');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({
        username: 'root',
        password: 'sekret',
      });
    });

    it('a new blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('#title').type('I am a test');
      cy.get('#author').type('Pavel Bure');
      cy.get('#url').type('www.testtest.com');
      cy.contains('add').click();
      cy.contains('I am a test');
    });
  });

  describe('Modifying the blog post', function () {
    beforeEach(function () {
      cy.login({
        username: 'root',
        password: 'sekret',
      });
      cy.createPost({
        title: 'Cypress Blog',
        author: 'Cypress Hill',
        url: 'www.hitsfromthebong.com',
        likes: 32,
      });
      cy.createPost({
        title: 'Test blog',
        author: 'Tester',
        url: 'www.thetestingblog.com',
        likes: 21,
      });
      cy.createPost({
        title: 'Third blog',
        author: 'Hank III',
        url: 'www.hellbilly.com',
        likes: 5,
      });
      cy.createPost({
        title: 'Fourth blog',
        author: 'Vol. 4',
        url: 'www.blacksabbath.com',
      });
    });

    it('a blog can be liked', function () {
      cy.contains('Tester').contains('show more').click();
      cy.contains('Tester').find('#like-button').click();
    });

    it('a blog can be deleted by its original poster', function () {
      cy.contains('Hank III').contains('show more').click();
      cy.contains('Hank III').find('#remove-button').click();
    });
  });

  describe('Displaying posts', function () {
    beforeEach(function () {
      cy.login({
        username: 'root',
        password: 'sekret',
      });
      cy.createPost({
        title: 'Cypress Blog',
        author: 'Cypress Hill',
        url: 'www.hitsfromthebong.com',
        likes: 32,
      });

      cy.createPost({
        title: 'Test blog',
        author: 'Tester',
        url: 'www.thetestingblog.com',
        likes: 21,
      });
      cy.createPost({
        title: 'Third blog',
        author: 'Hank III',
        url: 'www.hellbilly.com',
        likes: 5,
      });
      cy.createPost({
        title: 'Fourth blog',
        author: 'Vol. 4',
        url: 'www.blacksabbath.com',
      });
    });
    it('Blogs should be in descending order by likes', function () {
      cy.request('http://localhost:3001/api/posts').then((response) => {
        expect(response.body[0].likes).to.eq(32);
        expect(response.body[1].likes).to.eq(21);
        expect(response.body[2].likes).to.eq(5);
        expect(response.body[3].likes).to.eq(0);
      });
    });
  });
});
