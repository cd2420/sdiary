import React,{useEffect, useState} from "react";
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { firebaseInstance, serviceAuth, dbService } from "fbase";

const PhoneAuthProvide = () => {

  

    function onSignInSubmit(e) {
        e.preventDefault();
        if (isPhoneNumberValid()) {
          window.signingIn = true;
          updateSignInButtonUI();
          var phoneNumber = getPhoneNumberFromUserInput();
          var appVerifier = window.recaptchaVerifier;
          serviceAuth.signInWithPhoneNumber(phoneNumber, appVerifier)
              .then(function (confirmationResult) {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                
                window.confirmationResult = confirmationResult;
                window.signingIn = false;
                updateSignInButtonUI();
                updateVerificationCodeFormUI();
                updateVerifyCodeButtonUI();
                updateSignInFormUI();
              }).catch(function (error) {
                // Error; SMS not sent
                console.error('Error during signInWithPhoneNumber', error);
                window.alert('Error during signInWithPhoneNumber:\n\n'
                    + error.code + '\n\n' + error.message);
                window.signingIn = false;
                updateSignInFormUI();
                updateSignInButtonUI();
              });
        }
      }

      
      const addUser = async (user) => {
        const users = await dbService.collection("users").where("creatorId", "==", user.uid).get();
        const check = users.docs.length;
        if (check == 0) {
          getCheckUser(user);
        }
      }
      
      const getCheckUser = async(user) => {
        await dbService.collection("users").add({
          creatorId : user.uid,
          phoneNumber : user.phoneNumber,
          username : null,
          adminSign : false,
          sector : null,
          position : null
        });
      }
    
      /**
       * Function called when clicking the "Verify Code" button.
       */
      function onVerifyCodeSubmit(e) {
        e.preventDefault();
        if (!!getCodeFromUserInput()) {
          window.verifyingCode = true;
          updateVerifyCodeButtonUI();
          var code = getCodeFromUserInput();
          window.confirmationResult.confirm(code).then((result) => {
            // User signed in successfully.
            var user = result.user;

            addUser(user);

            window.verifyingCode = false;
            window.confirmationResult = null;
            updateVerificationCodeFormUI();
          }).catch(function (error) {
            // User couldn't sign in (bad verification code?)
            console.error('Error while checking the verification code', error);
            window.alert('Error while checking the verification code:\n\n'
                + error.code + '\n\n' + error.message);
            window.verifyingCode = false;
            updateSignInButtonUI();
            updateVerifyCodeButtonUI();
          });
        }
      }
    
      /**
       * Cancels the verification code input.
       */
      function cancelVerification(e) {
        e.preventDefault();
        window.confirmationResult = null;
        updateVerificationCodeFormUI();
        updateSignInFormUI();
      }
    
      /**
       * Signs out the user when the sign-out button is clicked.
       */
      function onSignOutClick() {
        serviceAuth.signOut();
      }
    
      /**
       * Reads the verification code from the user input.
       */
      function getCodeFromUserInput() {
        return document.getElementById('verification-code').value;
      }
    
      /**
       * Reads the phone number from the user input.
       */
      function getPhoneNumberFromUserInput() {
        return document.getElementById('phone-number').value;
      }

      function getNameFromUserInput() {
        return document.getElementById('user-name').value;;
      }
    
      /**
       * Returns true if the phone number is valid.
       */
      function isPhoneNumberValid() {
        var pattern = /^\+[0-9\s\-\(\)]+$/;
        var phoneNumber = getPhoneNumberFromUserInput();
        return phoneNumber.search(pattern) !== -1;
      }
    
      /**
       * Updates the Sign-in button state depending on ReCAptcha and form values state.
       */
      function updateSignInButtonUI() {
        document.getElementById('sign-in-button').disabled =
           !isPhoneNumberValid()
            || !!window.signingIn;
      }
    
      /**
       * Updates the Verify-code button state depending on form values state.
       */
      function updateVerifyCodeButtonUI() {
        document.getElementById('verify-code-button').disabled =
            !!window.verifyingCode
            || !getCodeFromUserInput();
      }
    
      /**
       * Updates the state of the Sign-in form.
       */
      function updateSignInFormUI() {
        if (serviceAuth.currentUser || window.confirmationResult) {
          document.getElementById('sign-in-form').style.display = 'none';
        } else {
          document.getElementById('sign-in-form').style.display = 'block';
        }
      }
    
      /**
       * Updates the state of the Verify code form.
       */
      function updateVerificationCodeFormUI() {
        if (!serviceAuth.currentUser && window.confirmationResult) {
          document.getElementById('verification-code-form').style.display = 'block';
        } else {
          document.getElementById('verification-code-form').style.display = 'none';
        }
      }
    
      /**
       * Updates the state of the Sign out button.
       */
      function updateSignOutButtonUI() {
        if (serviceAuth.currentUser) {
          document.getElementById('sign-out-button').style.display = 'block';
        } else {
          document.getElementById('sign-out-button').style.display = 'none';
        }
      }
    
     
    

    useEffect(
     () => {
        updateSignInButtonUI();
        updateSignInFormUI();
        updateSignOutButtonUI();
        updateVerificationCodeFormUI();

        document.getElementById('sign-in-form').addEventListener('submit', onSignInSubmit);
        document.getElementById('sign-out-button').addEventListener('click', onSignOutClick);
        document.getElementById('phone-number').addEventListener('keyup', updateSignInButtonUI);
        document.getElementById('phone-number').addEventListener('change', updateSignInButtonUI);
        document.getElementById('verification-code').addEventListener('keyup', updateVerifyCodeButtonUI);
        document.getElementById('verification-code').addEventListener('change', updateVerifyCodeButtonUI);
        document.getElementById('verification-code-form').addEventListener('submit', onVerifyCodeSubmit);
        document.getElementById('cancel-verify-code-button').addEventListener('click', cancelVerification);

        window.recaptchaVerifier = new firebaseInstance.RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': function(response) {
           
              updateSignInButtonUI();
            },
            'expired-callback': function() {
          
              updateSignInButtonUI();
            }
          });

          window.recaptchaVerifier.render().then(function(widgetId) {
            window.recaptchaWidgetId = widgetId;
          });

     }, []
    );
 
    return (
        <div class="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <main class="mdl-layout__content mdl-color--grey-100">
          <div class="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid">
      
      
            <div class="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop">
              <div class="mdl-card__title mdl-color--light-blue-600 mdl-color-text--white">
                <h2 class="mdl-card__title-text">휴대폰으로 로그인하기</h2>
              </div>
              <div class="mdl-card__supporting-text mdl-color-text--grey-600">
                <p>휴대폰 번호 입력</p>
      
                <form id="sign-in-form" action="#">
                  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input class="mdl-textfield__input" type="text" placeholder="Enter your phone number..." pattern="\+[0-9\s\-\(\)]+" id="phone-number" />
                   <span class="mdl-textfield__error">Input is not an international phone number!</span>
                  </div>
                  <div id="recaptcha-container"></div>
                  <input type="submit" disabled class="mdl-button mdl-js-button mdl-button--raised" id="sign-in-button" value="Sign-in"/>
                </form>
      
                <button class="mdl-button mdl-js-button mdl-button--raised" id="sign-out-button">Sign-out</button>

                <form id="verification-code-form" action="#">
                  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input class="mdl-textfield__input" type="text" id="verification-code" placeholder="코드입력" />
                    {/* <input class="mdl-textfield__input" type="text" placeholder="이름" id="user-name" value={userName} onChange={changeName} /> */}
                  </div>
                  <input type="submit" class="mdl-button mdl-js-button mdl-button--raised" id="verify-code-button" value="Verify Code"/>
                  <button class="mdl-button mdl-js-button mdl-button--raised" id="cancel-verify-code-button">Cancel</button>
                </form>

              </div>
            </div>
      
          </div>
        </main>
      </div>
    );
}

export default PhoneAuthProvide;