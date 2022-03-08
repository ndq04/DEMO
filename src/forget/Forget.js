import {useState} from 'react'
import {Link} from 'react-router-dom'
import {validateEmail} from './../utils/validate'

const Forget = () => {
  const [email, setEmail] = useState('')
  const [invalid, setInvalid] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setInvalid(validateEmail(email))
  }
  return (
    <form
      className='m-auto max-w-lg min-h-[120px] w-full border-[#202637] rounded-lg 
      bg-[#0c162d] p-4 flex flex-col select-none'
      onSubmit={handleSubmit}
    >
      <div className='h-[15%] flex flex-col w-full mb-3'>
        <h3 className='m-auto text-6xl whitespace-nowrap'>
          <span className='text-[#f47121]'>Omi</span>
          <span className='text-[#2a69ac]'>next</span>
        </h3>
        <div className='flex justify-center'>
          <p className='text-[#2a69ac] font-semibold whitespace-nowrap'>
            We Create The Next Values
          </p>
        </div>
      </div>
      <div className='w-full flex-1 bg-[#fff] p-3 rounded-md'>
        <h3 className='text-2xl font-medium text-[#0c162d]'>Forgot Password</h3>
        <p className='font-medium text-[#0c162d] mb-5'>
          Enter your e-mail address below to reset your password.
        </p>
        <div className='mb-5'>
          <input
            type='text'
            placeholder='Email'
            className='w-full px-4 py-1.5 border-2 outline-none border-[#0c162d] 
            rounded-full text-[#0c162d] text-lg'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {invalid && (
            <p className='bg-[#f2dedf] w-full text-[#b4787e] font-medium p-1 mt-3'>
              {invalid}
            </p>
          )}
        </div>
        <div className='flex items-center justify-between mb-3'>
          <Link
            to='/login'
            type='button'
            className='bg-[#f44121] text-white w-full p-2 text-lg rounded-full flex mr-7'
          >
            <span className='m-auto'>Back</span>
          </Link>
          <button
            type='submit'
            className='bg-[#2a69ac] text-white w-full p-2 text-lg rounded-full flex'
          >
            <span className='m-auto'>Submit</span>
          </button>
        </div>
      </div>
    </form>
  )
}

export default Forget
