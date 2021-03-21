<template>
  <form class="ui form change-email" @submit.prevent="onChangeEmail">
    <div class="two fields">
      <div class="field">
        <input type="text" placeholder="Nuevo email" v-model="formData.email" :class="{error: formError.email}"/>
      </div>
      <div class="field">
        <input type="password" placeholder="Contraseña actual"  v-model="formData.password" :class="{error: formError.password}"/>
      </div>
    </div>
    <p v-if="messageError">{{messageError}}</p>
    <button type="submit" class="ui button primary" :class="{loading}">
      Actualizar
    </button>
  </form>
</template>

<script>
import {ref} from "vue";
import * as yup from "yup";
import {reauthenticate} from "../../utils/firebaseFunctions";
import {auth} from "../../utils/firebase";

export default {
  name: "ChangeEmail",
  setup() {
    let formData = {};
    let formError = ref({});
    let messageError = ref("");
    let loading = ref(false);

    const schemaForm = yup.object().shape({
      email: yup.string().email(true).required(true),
      password: yup.string().required(true)
    });

    const onChangeEmail =  async () => {
      loading.value = true;
      messageError.value = "";
      formError.value = {};
      try {
        await schemaForm.validate(formData, {abortEarly: false});
        try {
          const {email, password} = formData;
          await reauthenticate(password);
          await auth.currentUser.updateEmail(email);
          auth.signOut();
        } catch (error) {
          messageError.value = error.message;
        }
      } catch(err) {
        err.inner.forEach((error) => {
          formError.value[error.path] = error.message;
        });
      }
      loading.value = false;
    };

    return {
      formData,
      formError,
      messageError,
      onChangeEmail,
      loading
    }
  }
}
</script>

<style lang="scss" scoped>
.ui.form.change-email {
  text-align: center;

  input.error {
    border-color: #FAA;
    background-color: #FFEDED;
  }

  .ui.button {
    margin: 20px 0 0 0;
  }
}
</style>
