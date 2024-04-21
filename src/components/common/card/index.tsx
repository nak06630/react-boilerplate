import React from 'react'
import { Icon, Card, CardHeader, CardContent, CardActions, Box } from '@mui/material'

type PropsCard = {
  children: any
}

export const NCard = ({ children, ...props }: PropsCard) => {
  return (
    <Card sx={{ borderRadius: 2 }} {...props}>
      {children}
    </Card>
  )
}

type PropsCardHeader = {
  title: string
  icon?: any
  subheader?: string
}

export const NCardHeader = ({ title, subheader, icon, ...props }: PropsCardHeader) => {
  return (
    <CardHeader
      title={
        <Box sx={{ mb: 1 }}>
          {icon && (
            <Icon sx={{ mr: 1 }} color="primary">
              {icon}
            </Icon>
          )}
          {title}
        </Box>
      }
      subheader={subheader?.split('\\n').map((item, index) => {
        return (
          <React.Fragment key={index}>
            {item}
            <br />
          </React.Fragment>
        )
      })}
      titleTypographyProps={{ variant: 'h5', fontWeight: 500 }}
      subheaderTypographyProps={{ variant: 'subtitle1' }}
      {...props}
    />
  )
}

export const NCardContent = CardContent
export const NCardActions = CardActions
