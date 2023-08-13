import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { beforeEach, describe, expect, vi } from 'vitest'
import Forms from '@/components/_example/Forms'

const setupForm = () => {
  const user = userEvent.setup()
  render(<Forms />)

  const submitForm = async () => await user.click(screen.getByRole('button', { name: '送信' }))
  const typeEmail = async (value: string) => await user.type(screen.getByRole('textbox', { name: 'メールアドレス' }), value)
  const selectGender = async (label: string) => await user.click(screen.getByRole('radio', { name: label }))
  //const selectSelect = async (label: string) => await user.click(screen.getByLabelText('button', { name: label }))
  const selectCheckbox = async (label: string) => await user.click(screen.getByRole('checkbox', { name: label }))

  //  return { submitForm, typeEmail, selectGender, selectSelect, selectCheckbox }
  return { submitForm, typeEmail, selectGender, selectCheckbox }
}

describe('Demo', () => {
  // const { typeEmail, selectGender, selectSelect, selectCheckbox, submitForm } = setupForm()
  const { typeEmail, selectGender, selectCheckbox, submitForm } = setupForm()
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('送信時、window.alertに値が渡される', async () => {
    window.alert = vi.fn()

    await typeEmail('sample@example.com')
    await selectGender('りんご')
    //    await selectSelect('りんご2')
    await selectCheckbox('りんご3')
    await submitForm()

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        JSON.stringify(
          {
            text: 'sample@example.com',
            radio: 'apple',
            select: 'apple2',
            checkbox: ['apple3']
          },
          null,
          2
        )
      )
    })
  })

  test('メールアドレスが未入力の場合、エラーメッセージが表示される', async () => {
    const { submitForm } = setupForm()
    await submitForm()
    await waitFor(() => {
      expect(screen.getByText('メールアドレスを入力してください')).toBeInTheDocument()
    })
  })
})
