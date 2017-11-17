// Getters
export const LOADING = 'shared/GET_LOADING'
export const ERROR = 'shared/GET_ERROR'
export const SUCCESS = 'shared/GET_SUCCESS'
export const INFO = 'shared/GET_INFO'

export const USER = 'authentication/GET_USER'
export const LOGIN_MODAL = 'authentication/GET_LOGIN_MODAL'
export const SIGNUP_MODAL = 'authentication/GET_SIGNUP_MODAL'

export const USER_INFO = 'authentication/profile/GET_USER_INFO'
export const USER_PROFILE = 'authentication/profile/GET_USER_PROFILE'

export const IS_FOLLOWING = 'authentication/profile/relationship/GET_IS_FOLLOWING'

export const BOOK_INFO = 'library/book/GET_BOOK_INFO' // OK
export const ISBN_CODE = 'library/book/GET_ISBN_CODE' // OK

export const BOOKSHELF = 'mybookshelf/GET_BOOKSHELF' // OK
export const COLLECTIONS = 'mybookshelf/GET_COLLECTIONS' // OK
export const FAVORITE = 'mybookshelf/GET_FAVORITE' // OK
export const WISHLIST = 'mybookshelf/GET_WISHLIST' // OK
// export const ADDING_LOCK = 'mybookshelf/GET_ADDING_LOCK'
export const GET_COLLECTION_BY_NAME = 'mybookshelf/GET_COLLECTION_BY_NAME'

// Mutations
export const SET_LOADING = 'shared/SET_LOADING'
export const SET_ERROR = 'shared/SET_ERROR'
export const SET_SUCCESS = 'shared/SET_SUCCESS'
export const SET_INFO = 'shared/SET_INFO'
export const CLEAR_SUCCESS = 'shared/CLEAR_SUCCESS'
export const CLEAR_INFO = 'shared/CLEAR_INFO'
export const CLEAR_ERROR = 'shared/CLEAR_ERROR'
export const CLEAR_ALL_MESSAGE = 'shared/CLEAR_ALL_MESSAGE'

export const SET_USER = 'authentication/SET_USER'
export const TOGGLE_LOGIN_MODAL = 'authentication/TOGGLE_LOGIN_MODAL'
export const TOGGLE_SIGNUP_MODAL = 'authentication/TOGGLE_SIGNUP_MODAL'

export const SET_USER_INFO = 'authentication/profile/SET_USER_INFO'
export const SET_USER_PROFILE = 'authentication/profile/SET_USER_PROFILE'

export const SET_IS_FOLLOWING = 'authentication/profile/relationship/SET_IS_FOLLOWING'

export const SET_BOOK_INFO = 'library/book/SET_BOOK_INFO' // OK
export const SET_ISBN_CODE = 'library/book/SET_ISBN_CODE' // OK

export const SET_BOOKSHELF = 'mybookshelf/SET_BOOKSHELF' // OK
export const SET_COLLECTIONS = 'mybookshelf/SET_COLLECTIONS' // OK
export const SET_FAVORITE = 'mybookshelf/SET_FAVORITE' // OK
export const SET_WISHLIST = 'mybookshelf/SET_WISHLIST' // OK

export const ADD_ONE_EMPTY_COLLECTION = 'mybookshelf/ADD_ONE_EMPTY_COLLECTION'
export const REMOVE_ONE_COLLECTION = 'mybookshelf/REMOVE_ONE_COLLECTION'
export const UPDATE_ONE_COLLECTION = 'mybookshelf/UPDATE_ONE_COLLECTION'
export const UPDATE_ONE_COLLECTION_NAME = 'mybookshelf/UPDATE_ONE_COLLECTION_NAME'
export const ENABLE_COLLECTION_EDITING = 'mybookshelf/ENABLE_COLLECTION_EDITING'
export const DISABLE_COLLECTION_EDITING = 'mybookshelf/DISABLE_COLLECTION_EDITING'
export const TOGGLE_COLLECTION_CHECK = 'mybookshelf/TOGGLE_COLLECTION_CHECK'
export const TOGGLE_COLLECTION_ISEXISTED = 'mybookshelf/TOGGLE_COLLECTION_ISEXISTED'
export const CLEAR_COLLECTIONS = 'mybookshelf/CLEAR_COLLECTIONS'

export const ADD_ONE_BOOK_INTO_COLLECTION = 'mybookshelf/ADD_ONE_BOOK_INTO_COLLECTION' // OK
export const ADD_ONE_BOOK_INTO_FAVORITE = 'mybookshelf/ADD_ONE_BOOK_INTO_FAVORITE' // OK
export const ADD_ONE_BOOK_INTO_WISHLIST = 'mybookshelf/ADD_ONE_BOOK_INTO_WISHLIST' // OK

export const REMOVE_ONE_BOOK_FROM_COLLECTION = 'mybookshelf/REMOVE_ONE_BOOK_FROM_COLLECTION' // OK

// Actions
export const ACTION_USER_LOGIN_ASYNC = 'authentication/USER_LOGIN'
export const ACTION_USER_SIGNUP_ASYNC = 'authentication/USER_SIGNUP'
export const ACTION_AUTO_SIGNIN = 'authentication/AUTO_SIGNIN'
export const ACTION_USER_LOGOUT = 'authentication/USER_LOGOUT'

export const ACTION_LOAD_USER_INFO_ASYNC = 'authentication/profile/LOAD_USER_INFO_ASYNC'
export const ACTION_LOAD_USER_PROFILE_BY_ID_ASYNC = 'authentication/profile/LOAD_USER_PROFILE_BY_ID_ASYNC'

export const ACTION_FOLLOW_THE_USER_ASYNC = 'authentication/profile/relationship/FOLLOW_THE_USER_ASYNC'
export const ACTION_UNFOLLOW_THE_USER_ASYNC = 'authentication/profile/relationship/UNFOLLOW_THE_USER_ASYNC'
export const ACTION_RELATIONSHIP_CHECK = 'authentication/profile/relationship/RELATIONSHIP_CHECK'

export const ACTION_SEARCH_BOOK_BY_ISBN_ASYNC = 'library/book/SEARCH_BOOK_BY_ISBN_ASYNC' // OK
export const ACTION_SEARCH_BOOK_BY_ISBN_IN_FB_ASYNC = 'library/book/SEARCH_BOOK_BY_ISBN_IN_FB_ASYNC'
export const ACTION_SAVE_BOOK_INFO_INTO_FB_ASYNC = 'library/book/SAVE_BOOK_INFO_INTO_FB_ASYNC'
export const ACTION_SAVE_ONE_BOOK_INTO_COLLECTION_IN_FB = 'library/book/SAVE_ONE_BOOK_INTO_COLLECTION_IN_FB' // OK
export const ACTION_SAVE_ONE_BOOK_INTO_FAVORITE_IN_FB = 'library/book/SAVE_ONE_BOOK_INTO_FAVORITE_IN_FB' // OK
export const ACTION_SAVE_ONE_BOOK_INTO_WISHLIST_IN_FB = 'library/book/SAVE_ONE_BOOK_INTO_WISHLIST_IN_FB' // OK

export const ACTION_REMOVE_ONE_BOOK_FROM_COLLECTION_IN_FB = 'library/book/REMOVE_ONE_BOOK_FROM_COLLECTION_IN_FB' // OK

export const ACTION_SAVE_ONE_COLLECTION_INTO_FB = 'mybookshelf/SAVE_ONE_COLLECTION_INTO_FB'
export const ACTION_REMOVE_ONE_COLLECTION_FROM_FB = 'mybookshelf/REMOVE_ONE_COLLECTION_FROM_FB'

export const ACTION_LOAD_MY_COLLECTIONS_ASYNC = 'mybookshelf/LOAD_MY_COLLECTIONS_ASYNC' // consolidate to the ACTION_LOAD_MY_BOOKSHELF_ASYNC
export const ACTION_LOAD_MY_FAVORITE_ASYNC = 'mybookshelf/LOAD_MY_FAVORITE_ASYNC' // consolidate to the ACTION_LOAD_MY_BOOKSHELF_ASYNC
export const ACTION_LOAD_MY_WISHLIST_ASYNC = 'mybookshelf/LOAD_MY_WISHLIST_ASYNC' // consolidate to the ACTION_LOAD_MY_BOOKSHELF_ASYNC

export const ACTION_LOAD_MY_BOOKSHELF_ASYNC = 'mybookshelf/LOAD_MY_BOOKSHELF_ASYNC' // OK
