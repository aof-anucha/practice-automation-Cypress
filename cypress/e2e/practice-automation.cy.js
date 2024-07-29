const url = 'https://practice-automation.com/'


describe('Test practice-automation', () => {
  beforeEach(() => {
    cy.visit(url);
    cy.viewport('macbook-15');
  });
  it.skip('JavaScript Delays', () => {
    cy.get(".wp-block-button")
    .contains('a', 'JavaScript Delays').click()

    cy.get("#start").click()
    cy.get("#delay", { timeout: 10000 }).should('have.value', 'Liftoff!')
  })
  it.skip('Form Fields', () => {
    cy.get(".wp-block-button")
    .contains('a', 'Form Fields').click()
    cy.get('#name').type('AOF')
    cy.get('#name').should('have.value', 'AOF')

    cy.get("#drink1").check()
    cy.get('#drink1[type="checkbox"]').not('[disabled]').should('be.checked')
    cy.get("#drink1").uncheck()
    cy.get('#drink1[type="checkbox"]').not('[disabled]').should('not.be.checked')
    cy.get('input[type="checkbox"]').check()
    cy.get('input[type="checkbox"]').uncheck(['Milk', 'Wine'])

    cy.get('input[name="fav_color"]').check('Yellow')
    cy.get('input[name="fav_color"]').should('be.checked')

    cy.get('#siblings').invoke('val').should('eq', 'default');
    // cy.get('#siblings').contains('').should('exist');   //cy.contains()` cannot be passed an empty string.
    cy.get('#siblings')
    .should('have.value', 'default')
    // .should('have.text', '')

    cy.get('#siblings').select('no')
    cy.get('#siblings')
    .should('have.value', 'no')
    // .should('have.text', 'No')

    cy.get('#feedbackForm')
    .contains('label','Fast animals')
    .next() //<ul> #1
    .children() //<li> #4
    .should('have.length', 4);

    cy.get('#email').type('test@gmail.com')
    cy.get('#email').should('not.have.value', 'AOF')

    cy.get('#message').type('Test form fields in textarea')
    cy.get('#message').should('have.value', 'Test form fields in textarea')

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Message received!');
    });

    cy.get('#feedbackForm').submit()

  });

  it.only('Slider', () => {
    cy.get(".wp-block-button")
    .contains('a', 'JavaScript Delays').scrollIntoView()
    // cy.visit('https://practice-automation.com/slider/')
    cy.get(".wp-block-button")
    .contains('a','Sliders').click({ force: true })


    cy.get('#slideMe')
    .invoke('val', 75).trigger('input')
    // cy.get('#slideMe')
    // .trigger('change')
    // cy.wait(3000) 
    cy.get('#value')
    .should('have.text', '75')
  });
  it('Broken Links', () => {
    cy.get(".wp-block-button")
    .contains('a', 'Click Events').scrollIntoView()

    cy.get(".wp-block-button")
    .contains('a','Broken Links').click({ force: true })

    cy.get(".entry-content a").contains('broken link')
    .then(($link) => {
      // ดึง URL จากแอตทริบิวต์ href ของลิงก์
      const url = $link.prop('href')
      cy.log(url)
      cy.request({
        url: url,
        failOnStatusCode: false // ปิดการตรวจสอบสถานะการตอบสนองอัตโนมัติ
      }).then((response) => {
        expect(response.status).to.eq(404) // ตรวจสอบให้แน่ใจว่าสถานะเป็น 200
      })
    })
  });

  it('Iframes', () => {
    cy.get(".wp-block-button")
    .contains('a', 'Click Events').scrollIntoView()

    cy.get(".wp-block-button")
    .contains('a','Iframes').click({ force: true })
    // ใช้คำสั่ง custom ที่สร้างขึ้นเพื่อเข้าถึง iframe

    cy.get('#iframe-1').should('be.visible').its('0.contentDocument').should('exist')
    // cy.getIframe('#iframe-1') // เปลี่ยน 'iframe#myIframe' เป็นตัวเลือกที่ถูกต้อง
    // .find('img') // เปลี่ยน 'button#myButton' เป็นตัวเลือกที่ถูกต้อง
    // .should('be.visible')
    
  });
})