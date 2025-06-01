import { ButtonColor, ButtonSize } from '@styles/button'
import styled from '@emotion/styled'

interface ButtonProps {
  color?: ButtonColor
  size?: ButtonSize
  weak?: boolean
  full?: boolean
  disabled?: boolean
}

const Button = styled.button<ButtonProps>({
  // 디폴트 값
  cursor: 'pointer',
  fontWeight: 'bold',
  borderRadius: '6px',
})
