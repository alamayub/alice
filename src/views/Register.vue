<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-card max-width="500" class="mx-auto">
        <v-overlay :value="overlay">
          <v-progress-circular indeterminate size="64" ></v-progress-circular>
        </v-overlay>
        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-text-field prepend-inner-icon="mdi-account-outline" v-model="register.username" label="Username" required />
            <v-text-field prepend-inner-icon="mdi-email" v-model="register.email" label="E-mail" required />
            <v-text-field prepend-inner-icon="mdi-lock" v-model="register.password" :type="showPass ? 'text' : 'password'" :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPass = !showPass" label="Password" class="password" />  
            <v-btn :disabled="$v.register.$invalid" color="primary" @click="registerMe">Register</v-btn>
          </v-form>    
        </v-card-text>
      </v-card>
    </v-row>  
  </v-container>
</template>

<script>
import { required, email, minLength, helpers } from 'vuelidate/lib/validators'
const regex = helpers.regex('regex', /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
import { fb, db } from '../firebase'
export default {
  data: () => ({
    overlay: false,
    register: {
      username: '',
      email: '',
      password: '',
    },
    showPass: false
  }),
  methods: {
    async registerMe() {
      if(this.$refs.form.validate()) {
        this.overlay = true
        await fb.auth().createUserWithEmailAndPassword(this.register.email, this.register.password).then( async u => {
          localStorage.setItem('username', this.register.username)
          localStorage.setItem('email', this.register.email)
          console.log('user created')
          console.log(u)
          await db.collection('users').doc(u.user.uid).set({
            username: this.register.username,
            email: this.register.email,
            password: this.register.password,  
            uid: u.user.uid
          }).then( async () => {
            console.log('response after database, ')  
            await u.user.updateProfile({
              displayName: this.register.username  
            }).then( () => console.log('Profile updated, ')).catch( e => console.log(e)) 
          }).catch( e => console.log(e)) 
        }).catch( e => console.log(e)) 
        this.overlay = false
      }  
    }  
  },
  validations: {
    register: {
      username: { required, minLength: minLength(6) },
      email: { required, email },
      password: { required, regex }
    }
  },
}
</script>