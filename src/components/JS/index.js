import Vue from 'vue'
import MessageBox from './MessageBox'

export const messageBox = (function () {
  let defaults = {
    title: "",
    content: "",
    cancel: "",
    ok: "",
    handleCancel: null,
    handleOk: null
  };
  let Mycomponent = Vue.extend(MessageBox);
  return function (opts) {
    for (const key in defaults) {
      defaults[key] = opts[key];
    }

    let vm = new Mycomponent({
      el: document.createElement('div'),
      data: {
        title: defaults.title,
        content: defaults.content,
        cancel: defaults.cancel,
        ok: defaults.ok,
      },
      methods: {
        handleCancel() {
          defaults.handleCancel && defaults.handleCancel.call(this);
          document.body.removeChild(vm.$el);
        },
        handleOk() {
          defaults.handleOk && defaults.handleOk.call(this);
          document.body.removeChild(vm.$el);
        }
      }
    })
    document.body.appendChild(vm.$el);
  };
})()