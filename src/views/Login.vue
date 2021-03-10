<template>
  <v-container fluid class="fill-height">
    <v-row justify="center" align="center">
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64" ></v-progress-circular>
      </v-overlay>
      <v-card class="pa-0" height="550" width="400" style="overflow: hidden; background-image: linear-gradient(to top right, #f9a743, #f9db5f);">
        <v-card-text class="py-0">
            
          <!-- EAR -->  
          <div class="ear ear-top-left"></div>  
          <div class="ear ear-top-right"></div>

          <!-- FACE --> 
          <div class="face">
            <!-- EYES -->  
            <div class="eyes">
              <div class="eye eye-left">
                <div class="glow"></div>  
              </div>
              <div class="eye eye-right">
                <div class="glow"></div>  
              </div>
            </div>  
            <!-- NOSE -->
            <div class="nose">
              <svg width="38.161" height="22.03">
                <path d="M2.017 10.987Q-.563 7.513.157 4.754C.877 1.994 2.976.135 6.164.093 16.4-.04 22.293-.022 32.048.093c3.501.042 5.48 2.081 6.02 4.661q.54 2.579-2.051 6.233-8.612 10.979-16.664 11.043-8.053.063-17.336-11.043z" fill="#243946" /> 
              </svg>  
              <div class="glow"></div> 
            </div>
            <!-- MOUTH -->
            <div class="mouth">
              <svg class="smile" viewBox="-2 -2 84 23" width="84" height="23">
                <path d="M0 0c3.76 9.279 9.69 18.98 26.712 19.238 17.022.258 10.72.258 28 0S75.959 9.182 79.987.161" fill="none" stroke-width="3" stroke-linecap="square" stroke-miterlimit="3" />
              </svg>  
              <div class="mouth-hole"></div>
              <div class="tongue breath">
                <div class="tongue-top"></div>
                <div class="line"></div>
                <div class="median"></div>  
              </div>
            </div>
          </div>

          <!-- HANDS -->
          <div class="hands">
            <div class="hand hand-left">
              <div class="finger" v-for="a in 3" :key="a">
                <div class="bone"></div>
                <div class="nail"></div>  
              </div>
            </div>
            <div class="hand hand-right">
              <div class="finger" v-for="a in 3" :key="a">
                <div class="bone"></div>
                <div class="nail"></div>  
              </div>
            </div>  
          </div>

          <!-- FORM   -->
          <v-form ref="form" lazy-validation>
            <v-text-field prepend-inner-icon="mdi-account" v-model="login.email" label="Username" outlined rounded class="username" @focus="usernameFocusEvent" @input="usernameInputEvent" @blur="usernameBlurEvent" required />
            <v-text-field prepend-inner-icon="mdi-lock" v-model="login.password" :type="showPass ? 'text' : 'password'" :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'" @click:append="togglePass" label="Password" outlined rounded class="password" @focus="passwordFocusEvent" @blur="passwordBlurEvent" required />  
          </v-form>

        </v-card-text>  
        <v-card-actions class="mx-4">
          <v-btn :disabled="$v.login.$invalid" width="150" rounded large color="primary" dark @click.prevent="loginMe"> Login </v-btn>
          <v-spacer />
          <v-btn rounded small color="secondary" dark to="/register"> register </v-btn>  
          
        </v-card-actions>
        
      </v-card>
    </v-row>  
  </v-container>  
</template>

<script>
import { required, email, helpers } from 'vuelidate/lib/validators'
const regex = helpers.regex('regex', /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
import { fb } from '../firebase'
  export default {
    data: () => ({
      overlay: false, 
      login: {
        email: '',
        password: '',
      },
      showPass: false
    }),
    validations: {
      login: {
        email: { required, email },
        password: { required, regex }
      }
    },
    methods: {
      usernameFocusEvent () {
        let face = document.querySelector('.face')
        let length = Math.min(this.username.length - 16, 19)
        document.querySelectorAll('.hand').forEach(hand => {
          hand.classList.remove('hide')
          hand.classList.remove('peek')
        })
        face.style.setProperty('--rotate-head', `${-length}deg`)  
      },  
      usernameBlurEvent () {
        let face = document.querySelector('.face')  
        face.style.setProperty('--rotate-head', '0deg')
      },
      usernameInputEvent () {
        let face = document.querySelector('.face')    
        let length = Math.min(this.username.length - 16, 19)
        face.style.setProperty('--rotate-head', `${-length}deg`)  
      },
      passwordFocusEvent() {
        document.querySelectorAll('.hand').forEach(hand => {
          hand.classList.add('hide')
        })
        document.querySelector('.tongue').classList.remove('breath')
      }, 
      passwordBlurEvent() {
        document.querySelectorAll('.hand').forEach(hand => {
          hand.classList.remove('hide')
          hand.classList.remove('peek')
        })
        document.querySelector('.tongue').classList.add('breath')  
      }, 
      togglePass() {
        if (this.showPass == true) {
          document.querySelectorAll('.hand').forEach(hand => {
            hand.classList.remove('peek')
            hand.classList.add('hide')
          })
        } else {
          document.querySelectorAll('.hand').forEach(hand => {
            hand.classList.remove('hide')
            hand.classList.add('peek')
          })
        }
        this.showPass = !this.showPass  
      },
      async loginMe () {
        if(this.$refs.form.validate()) {
          this.overlay = true
          await fb.auth().signInWithEmailAndPassword(this.login.email, this.login.password).then( u => {
            localStorage.setItem('username', u.user.displayName)
            localStorage.setItem('email', u.user.email)
          }).catch( e => console.log(e))
          this.overlay = false
        }
      },
    },
  }
</script>

<style scoped>
@keyframes breath {
  0%, 100% { transform: rotateX(0deg); }
  50% { transform: rotateX(60deg); }  
}
/* EAR */
.ear {
  position: absolute;
  top: -100px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: #243946;
}
.ear.ear-top-left { left: -135px; }
.ear.ear-top-right { right: -135px; }
/* FACE */
.face {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  height: 150px;
  margin: 80px auto 10px;
  --rotate-head: 0deg;
  transform: rotate(var(--rotate-head));
  transition: transform 0.2s;
  transform-origin: center 20px;  
}
.eye {
  display: inline-block;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: #243946;  
}
.eye.eye-left { margin-right: 40px; }
.eye.eye-right { margin-left: 40px; }
.eye .glow {
  position: relative;
  top: 3px;
  right: -12px;
  width: 12px;
  height: 6px;
  border-radius: 50%;
  background-color: white;
  transform: rotate(38deg);  
}
.nose {
  position: relative;
  top: 30px;
  transform: scale(1.1);  
}
.nose .glow {
  position: absolute;
  top: 3px;
  left: 32%;
  width: 15px;
  height: 8px;
  border-radius: 50%;
  background-color: #476375;  
}
.mouth { position: relative; margin-top: 45px; }
svg.smile {
  position: absolute;
  left: -28px;
  top: -19px;
  transform: scaleX(1.1);
  stroke: #243946;
}
.mouth-hole {
  position: absolute;
  top: 0;
  left: -50%;
  width: 60px;
  height: 15px;
  border-radius: 50% / 100% 100% 0% 0;
  transform: rotate(180deg);
  background-color: #243946;
  z-index: -1;
}
.tongue {
  position: relative;
  top: 5px;
  width: 30px;
  height: 20px;
  background-color: #ffd7dd;
  transform-origin: top;
  transform: rotateX(60deg);
}
.tongue.breath { animation: breath 0.3s infinite linear; }
.tongue-top {
  position: absolute;
  bottom: -15px;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: #ffd7dd;
}
.line {
  position: absolute;
  top: 0;
  width: 30px;
  height: 5px;
  background-color: #fcb7bf; 
}
.median {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 25px;
  border-radius: 5px;
  background-color: #fcb7bf;
}
/* HANDS */
.hands { position: relative; }
.hands .hand {
  position: absolute;
  top: -6px;
  display: flex;
  transition: transform 0.5s ease-in-out;
  z-index: 1;
}
.hand-left { left: 100px; }
.hand-left.hide { transform: translate(2px, -155px) rotate(-160deg); }
.hand-left.peek { transform: translate(0px, -120px) rotate(-160deg); }
.hand-right { right: 100px; }
.hand-right.hide { transform: translate(-6px, -155px) rotate(160deg); }
.hand-right.peek { transform: translate(-4px, -120px) rotate(160deg); }
.finger { position: relative; z-index: 0; }
.finger .bone {
  width: 20px;
  height: 20px;
  border: 2px solid #243946;
  border-bottom: none;
  border-top: none;
  background-color: #fac555;  
}
.finger .nail {
  position: absolute;
  left: 0;
  top: 10px;
  width: 20px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #243946;
  background-color: #fac555;
  z-index: -1;
}
.finger:nth-child(1), .finger:nth-child(3) { left: 4px; z-index: 1; }
.finger:nth-child(1) .bone, .finger:nth-child(3) .bone { height: 10px; }
.finger:nth-child(3) { left: -4px; }
.finger:nth-child(2) { top: -5px; z-index: 2; }
.finger:nth-child(1) .nail, .finger:nth-child(3) .nail { top: 0px; }
.username, .password {
  border: none i !important;
  outline: none !important;  
}
</style>