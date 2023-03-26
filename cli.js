#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

const componentName = process.argv[3];
const componentFolderName = `./${componentName}`;
const screenName =
    componentName.charAt(0).toUpperCase() + componentName.slice(1);

const componentTemplate = `
import { View, Text } from 'react-native';
import React from 'react';

export default function <%= screenName %>() {
  return (
    <View>
      <Text><%= screenName %></Text>
    </View>
  );
}
`;

const testTemplate = `
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import <%= screenName %> from './<%= screenName %>';

test('<%= screenName %> test', () => {

});
`;

// Create the component directory
fs.mkdirSync(componentFolderName);

// Create the component file
fs.writeFileSync(
    `${componentFolderName}/${screenName}.tsx`,
    ejs.render(componentTemplate, { screenName }),
    "utf8"
);

// Create the test file
fs.writeFileSync(
    `${componentFolderName}/${screenName}.test.tsx`,
    ejs.render(testTemplate, { screenName }),
    "utf8"
);

console.log(
    `Screen '${screenName}' created successfully at ${componentFolderName}`
);
