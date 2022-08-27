import React, { useContext } from 'react'
import Context from '@/presentation/contexts/form/form-contexts'

type Props = {
  text: string
}

const SubmitButton: React.FC<Props> = ({ text }: Props) => {
  const { errorState } = useContext(Context)

  return (
    <button data-testid='submit' disabled={errorState.isFormInvalid} type='submit'>{text}</button>
  )
}

export default SubmitButton
