import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { describe, test, expect } from 'vitest'
import Forms2 from '.'
import { prettyDOM } from '@testing-library/react'

describe('Forms2', () => {
  test('名前が10文字超え', async () => {
    const user = userEvent.setup()
    render(<Forms2 />)
    await user.type(screen.getByRole('textbox', { name: 'Name' }), '11111111111111111')
    await user.click(screen.getByRole('button', { name: '送信' }))
    await waitFor(() => {
      expect(screen.getByText(/名前が10文字を超えています/i))
    })
  })
  test('ID,radioを設定', async () => {
    const user = userEvent.setup()
    const { baseElement } = render(<Forms2 />)

    await user.type(screen.getByRole('textbox', { name: 'Name' }), '11111')

    /* Select */
    await user.click(screen.getByRole('combobox', { name: 'Select' }))
    await user.click(screen.getByRole('option', { name: '$' }))

    /* RadioGroup */
    await user.click(screen.getByRole('radio', { name: 'Male' }))

    await user.click(screen.getByRole('button', { name: '送信' }))
    console.log(prettyDOM(baseElement, Infinity)) //ログを全部見たいとき
    expect(screen.getByText(/"radio1": "male"/i))
  })
})
