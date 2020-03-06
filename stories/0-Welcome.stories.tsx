import React from 'react';
import PhoneField, { registerLocale } from '@';

export default {
  title: 'Welcome',
};

registerLocale('en')

export const toStorybook = () => <PhoneField />;

toStorybook.story = {
  name: 'to Storybook',
};
