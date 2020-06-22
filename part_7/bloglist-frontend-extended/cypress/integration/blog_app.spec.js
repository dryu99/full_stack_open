describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'root',
      name: 'Root Toot',
      password: 'rootpassword'
    });
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function() {
    cy.contains('login to application');
    cy.get('input#username').parent().contains('username');
    cy.get('input#password').parent().contains('password');
  });

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('input#username').type('root');
      cy.get('input#password').type('rootpassword');
      cy.get('button').contains('login').click();

      cy.contains('Root Toot logged in');
    });

    it('fails with wrong credentials', function() {
      cy.get('input#username').type('root');
      cy.get('input#password').type('wrong');
      cy.get('button').contains('login').click();

      cy.should('not.contain', 'Root Toot logged in');
    });
  });

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'rootpassword' });
    });

    it('a blog can be created', function() {
      cy.get('button').contains('new blog').click();
      cy.get('input#title-input').type('Cypress Title');
      cy.get('input#author-input').type('Cypress Author');
      cy.get('input#url-input').type('Cypress URL');

      cy.get('button').contains('create').click();
      cy.contains('Cypress Title Cypress Author');
    });

    describe('and several blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'Cypress Title', author:'Cypress Author', url: 'Cypress URL' });
        cy.createBlog({ title: 'title 2', author:'author 2', url: 'url 2' , likes: 10 });
        cy.createBlog({ title: 'title 3', author:'author 3', url: 'url 3' , likes: 7 });
        cy.get('.toggle-button').click({ multiple: true });
      });

      it('a blog can be liked', function() {
        cy.get('.blog').find('button').contains('like').as('likeButton');
        cy.get('@likeButton').click();
        cy.get('@likeButton').click();
        cy.get('@likeButton').click();
        cy.get('span').contains('likes').contains('3');
      });

      it('a blog can be deleted', function() {
        cy.contains('Cypress Title Cypress Author');
        cy.get('.blog').find('button').contains('remove').click();
        cy.should('not.contain', 'Cypress Title Cypress Author');
      });

      it('a blog cannot be deleted by a user who didn\'t create it', function() {
        cy.request('POST', 'http://localhost:3003/api/users', {
          username: 'test',
          name: 'Test Test',
          password: 'testpassword'
        });

        cy.login({ username: 'test', password: 'testpassword' });
        cy.get('.blog').find('button').contains('view').click();

        cy.get('.blog').find('button').contains('remove').click();
        cy.contains('Cypress Title Cypress Author');
      });

      it('blogs are ordered according to likes in descending order', function() {
        let prevLikes;

        cy.get('.blog').should('have.length', 3);
        cy.get('.blog').each(($el, index, $list)  => {
          const currentLikes = Number($el.find('.likes').text());

          if (index > 0) {
            if (currentLikes > prevLikes) {
              throw new Error('something went horribly wrong');
            }
          }
          prevLikes = currentLikes;
        });
      });
    });
  });
});