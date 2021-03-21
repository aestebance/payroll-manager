<template>
  <form class="ui form change-name" @submit.prevent="onChangeName">
    <input type="text" placeholder="Nombre y apellidos" v-model="name" :class="{error: formError}"/>
    <button type="submit" class="ui button primary" :class="{loading}">Actualizar</button>
  </form>
</template>

<script>
import {ref} from "vue";
import {useStore} from "vuex";
import * as yup from "yup";
import {auth} from "../../utils/firebase";

export default {
  name: "ChangeName",
  setup() {
    const store = useStore();
    let name = ref("");
    let formError = ref(false);
    let loading = ref(false);

    const schemaForm = yup.object().shape({
      name: yup.string().required(true).min(6, true)
    });

    const onChangeName = async () => {
      loading.value = true;
      formError.value = false;

      try {
        await schemaForm.validate({name: name.value}, {abortEarly: false});
        try {
          await auth.currentUser.updateProfile({
            displayName: name.value
          });
          await store.dispatch("reloadUser");
        } catch(error) {
          console.log(error);
        }
      } catch (err) {
        err.inner.forEach((error) => {
          formError.value = error.message;
        });
      }
      loading.value = false;
    };
    return {
      name,
      onChangeName,
      formError,
      loading
    }
  }
}
</script>

<style lang="scss" scoped>
.ui.form.change-name {
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
