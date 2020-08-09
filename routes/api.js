/**
 * API rules
 */

/*
    Structure
      name : {
        url: "" url path
        controller: "" controllerName,
        methods: {
            method name in controller file: "get | post | put | delete", 
        }
        path: "", extra folder path (opational)
        middleware: [] middleware array (opational)
    }
 */

module.exports = {
  phonebook: {
    url: '/phonebook',
    controller: 'phonebook',
    methods: {
      create: 'post',
      update: 'put',
      allContact: 'get',
      delete: 'delete',
    },
  },

  getContact: {
    url: '/phonebook/:number',
    controller: 'phonebook',
    methods: {
      read: 'get',
    },
  },
};
