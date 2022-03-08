import {useContext, useEffect, useRef, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {LoadingContext} from './../context/loading/LoadingContext'
import {postDataApi} from './../utils/fetchDataApi'

const fullName_regex = /^[A-z' ']{8,255}$/
const email_regex =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b$/
const pass_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,255}$/

function Register() {
  const {loadingDispatch} = useContext(LoadingContext)
  const navigate = useNavigate()

  const fullNameRef = useRef()
  const errRef = useRef()

  const [fullName, setFullName] = useState('')
  const [validFullName, setValidFullName] = useState(false)
  const [fullNameFocus, setFullNameFocus] = useState(false)

  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)

  const [pass, setPass] = useState('')
  const [validPass, setValidPass] = useState(false)
  const [passFocus, setPassFocus] = useState(false)

  const [cfPass, setCfPass] = useState('')
  const [validCfPass, setValidCfPass] = useState(false)
  const [cfPassFocus, setCfPassFocus] = useState(false)
  const [select, setSelect] = useState('')

  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    fullNameRef.current.focus()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrMsg('')
    try {
      loadingDispatch({
        type: 'LOADING',
        payload: true,
      })

      const res = await postDataApi('http://localhost:5000/api/auth/register', {
        fullname: fullName,
        email,
        password: pass,
      })
      const data = await res.json()

      if (res.status >= 200 && res.status <= 299) {
        loadingDispatch({
          type: 'LOADING',
          payload: false,
        })
        toast.success(data?.message)
        navigate('/login')
      } else {
        loadingDispatch({
          type: 'LOADING',
          payload: false,
        })
        toast.error(data?.message)
        errRef.current.focus()
        setErrMsg(data?.message)
        navigate('/register')
      }
    } catch (error) {
      toast.error('Internal Server Error !')
    }
  }

  return (
    <form
      className='m-auto max-w-md min-h-[500px] w-full border border-[#202637] rounded-lg bg-[#0c162d] px-5 py-2 flex flex-col select-none'
      onSubmit={handleSubmit}
    >
      <div className='h-[15%] flex flex-col w-full mb-3'>
        <h3 className='m-auto text-6xl '>
          <span className='text-[#f47121]'>Omi</span>
          <span className='text-[#2a69ac]'>next</span>
        </h3>
        <p className='text-[#2a69ac] font-semibold text-sm flex justify-center ml-12'>
          We Create The Next Values
        </p>
      </div>

      {/* Fullname */}
      <div className='w-full pb-1.5'>
        <div className='w-full'>
          <label className='flex flex-col cursor-pointer'>
            <p className='flex items-center'>
              <span className='font-medium text-[#f47121] mr-1'>Full Name</span>
              {fullNameFocus && validFullName && (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 text-green-600'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
              )}
              {fullName && fullNameFocus && !validFullName && (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 text-red-600'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              )}
            </p>
            <div className='flex flex-col w-full'>
              <div className='flex items-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 text-[#2a69ac]'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
                <input
                  type='text'
                  required
                  className='px-3 pb-1 flex-1 border-b-[1px] border-[#2a69ac] outline-none bg-transparent text-white text-[17px]'
                  ref={fullNameRef}
                  value={fullName.replace(/\s+/g, ' ').replace(/\W/g, ' ')}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete='off'
                  onFocus={() => setFullNameFocus(false)}
                  onBlur={(e) => {
                    setFullNameFocus(true)
                    setFullName(e.target.value.trim())
                    const result = fullName_regex.test(fullName)
                    setValidFullName(result)
                  }}
                  maxLength={255}
                />
              </div>

              {fullNameFocus && fullName && !validFullName && (
                <p className='w-full rounded-md bg-red-600 text-white mt-2 text-sm font-medium p-1.5'>
                  <span className='flex items-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5 mr-1'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <span>Must be at least 8 characters.</span>
                  </span>
                  Fullname must not contain digits.
                </p>
              )}
            </div>
          </label>
        </div>
      </div>

      {/* Email */}
      <div className='w-full pb-1.5'>
        <div className='w-full'>
          <label className='flex flex-col cursor-pointer'>
            <p className='flex items-center'>
              <span className='font-medium text-[#f47121] mr-1'>Email</span>
              {emailFocus && validEmail && (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 text-green-600'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
              )}
              {email && emailFocus && !validEmail && (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 text-red-600'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              )}
              {errMsg && (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 text-red-600'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              )}
            </p>
            <div className='flex flex-col w-full'>
              <div className='flex items-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 text-[#2a69ac]'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
                <input
                  type='text'
                  ref={errRef}
                  required
                  className='px-3 pb-1 flex-1 border-b-[1px] border-[#2a69ac] outline-none bg-transparent text-white text-[17px]'
                  value={email.replace(/\s+/g, '')}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setErrMsg('')
                  }}
                  autoComplete='off'
                  onFocus={() => setEmailFocus(false)}
                  onBlur={(e) => {
                    setEmailFocus(true)
                    setEmail(e.target.value.trim())
                    const result = email_regex.test(email)
                    setValidEmail(result)
                    setErrMsg('')
                  }}
                />
              </div>
              {emailFocus && email && !validEmail && (
                <p className='w-full rounded-md bg-red-600 text-white mt-2 text-sm font-medium p-1.5'>
                  <span className='flex items-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5 mr-1'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <span>Invalid email format.</span>
                  </span>
                </p>
              )}
              {errMsg && (
                <p className='w-full rounded-md bg-red-600 text-white mt-2 text-sm font-medium p-1.5'>
                  <span className='flex items-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5 mr-1'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <span>{errMsg}</span>
                  </span>
                </p>
              )}
            </div>
          </label>
        </div>
      </div>

      {/* Password */}
      <div className='w-full pb-1.5'>
        <div className='w-full'>
          <label className='flex flex-col cursor-pointer'>
            <p className='flex items-center'>
              <span className='font-medium text-[#f47121] mr-1'>Password</span>
              {passFocus && validPass && (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 text-green-600'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
              )}
              {pass && passFocus && !validPass && (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 text-red-600'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              )}
            </p>
            <div className='flex flex-col w-full'>
              <div className='flex items-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 text-[#2a69ac]'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
                <input
                  type='text'
                  required
                  className='px-3 pb-1 flex-1 border-b-[1px] border-[#2a69ac] outline-none bg-transparent text-white text-[17px]'
                  value={pass.replace(/\s+/g, '')}
                  onChange={(e) => setPass(e.target.value)}
                  autoComplete='off'
                  onFocus={() => setPassFocus(false)}
                  onBlur={() => {
                    setPassFocus(true)
                    const result = pass_regex.test(pass)
                    setValidPass(result)
                    const match = pass === cfPass
                    setValidCfPass(match)
                  }}
                  maxLength={255}
                />
              </div>
              {passFocus && pass && !validPass && (
                <p className='w-full rounded-md bg-red-600 text-white mt-2 text-sm font-medium p-1.5'>
                  <span className='flex items-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5 mr-1'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <span>Must be at least 8 characters.</span>
                  </span>
                  Must include uppercase and lowercase letters, a number and a
                  special character.
                  <br />
                  Allowed special characters: ! @ # $ %
                </p>
              )}
            </div>
          </label>
        </div>
      </div>

      {/* Confirm Password */}
      <div className='w-full pb-1.5'>
        <div className='w-full'>
          <label className='flex flex-col cursor-pointer'>
            <p className='flex items-center'>
              <span className='font-medium text-[#f47121] mr-1'>
                Confirm Password
              </span>
              {cfPass && cfPassFocus && validCfPass && (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 text-green-600'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
              )}
              {cfPass && cfPassFocus && !validCfPass && (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 text-red-600'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              )}
            </p>
            <div className='flex flex-col w-full'>
              <div className='flex items-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 text-[#2a69ac]'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
                <input
                  type='text'
                  required
                  className='px-3 pb-1 flex-1 border-b-[1px] border-[#2a69ac] outline-none bg-transparent text-white text-[17px]'
                  value={cfPass.replace(/\s+/g, '')}
                  onChange={(e) => setCfPass(e.target.value)}
                  autoComplete='off'
                  onFocus={() => setCfPassFocus(false)}
                  onBlur={() => {
                    setCfPassFocus(true)
                    setPassFocus(true)
                    const result = pass_regex.test(pass)
                    setValidPass(result)
                    const match = pass === cfPass
                    setValidCfPass(match)
                  }}
                  maxLength={255}
                />
              </div>
              {cfPassFocus && cfPass && !validCfPass && (
                <p className='w-full rounded-md bg-red-600 text-white mt-2 text-sm font-medium p-1.5'>
                  <span className='flex items-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5 mr-1'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <span>Must match the first password input field.</span>
                  </span>
                </p>
              )}
            </div>
          </label>
        </div>
      </div>

      {/* Select */}
      <div className='my-6 w-full'>
        <select
          className='w-full px-4 py-2 border border-[#2a69ac] rounded-full outline-none 
              text-[#2a69ac] bg-transparent cursor-pointer'
          name='select'
          value={select}
          onChange={(e) => setSelect(e.target.value)}
        >
          <option value='1'>BGD</option>
          <option value='2'>DGB</option>
        </select>
      </div>

      <button
        type='submit'
        className={`${
          !validFullName || !validEmail || !validPass || !validCfPass
            ? 'bg-[#4f92da] opacity-50 text-white py-2 text-lg rounded-full cursor-not-allowed'
            : 'bg-[#2a69ac] text-white py-2 text-lg rounded-full'
        }`}
        disabled={
          !validFullName || !validEmail || !validPass || !validCfPass
            ? true
            : false
        }
      >
        Register
      </button>

      <h3 className='flex justify-center py-2 text-lg'>
        <span className='text-[#e7e9ea]'>Already have an account?</span>
        <Link to='/login'>
          <span className='ml-1 cursor-pointer hover:underline text-[#f47121]'>
            Login now
          </span>
        </Link>
      </h3>
    </form>
  )
}

export default Register
