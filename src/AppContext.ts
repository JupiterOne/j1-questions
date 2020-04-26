import {createContext} from "react"
const Context = createContext({
  managedQuestions: {
    integrations: {
      'x' : {
        title: 'X'
      }
    },
    questions: [
      {
        compliance: [
          {
            standard: ''
          }
        ],
        description: '',
        title: 'Why do I test things?',
        queries: [{query: ''}],
        tags: ['testing'],
      }
    ]
  },
  allTags:  [''],
  themeDark: false, setTheme: (a: any) => {},
  allCategories:  [''],
  search:'', setSearch: (a: any) => {},
  integrations: [''], setIntegrations: (a: any) => {},
  tags: [''], setTags: (a: any) => {},
  tagFilter: '', setFilterLogic: (a: any) => {},
  categories: [''], setCategories: (a: any) => {}
})
export default Context
