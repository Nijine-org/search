#!/bin/bash

# Prompt for the module and sub-module names
read -p "Enter the module name: " module_name
read -p "Enter the sub-module name: " sub_module_name

# Create the module directory and navigate to it
mkdir -p "src/app/(DashboardLayout)/$module_name/$sub_module_name" && cd "src/app/(DashboardLayout)/$module_name/$sub_module_name" || { 
    echo "Failed to create or navigate to the directory"; 
    exit 1; 
}

# Create directories
mkdir -p _components _actions _types _constants _validation add "[id]" edit/[id]

# Define content for the files
error_content="'use client';
import React from 'react';
import DefaultButton from '@/app/components/shared/DefaultButton';
export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const handleClick = () => {
    reset();
  };
  return (
    <div>
      <h2 className=\"pb-3\">This service is currently unavailable !</h2>
      <DefaultButton handleClick={handleClick} text=\"Try Again\" />
    </div>
  );
}"

loading_content="import React from 'react';

const loading = () => {
  return <div>loading</div>;
};

export default loading;"

page_content="import React from 'react';

const page = () => {
  return (
    <div>page</div>
  );
};

export default page;"

touch '_actions/index.ts'
touch '_types/index.ts'
touch '_constants/index.ts'
touch '_constants/json/index.ts'
touch '_validation/index.ts'

# Function to write content to files
write_content() {
    echo "$2" > "$1"
}

# Create and populate the files
write_content "page.tsx" "$page_content"
write_content "loading.tsx" "$loading_content"
write_content "error.tsx" "$error_content"

write_content "add/page.tsx" "$page_content"
write_content "add/loading.tsx" "$loading_content"
write_content "add/error.tsx" "$error_content"

write_content "[id]/page.tsx" "$page_content"
write_content "[id]/loading.tsx" "$loading_content"
write_content "[id]/error.tsx" "$error_content"

write_content "edit/[id]/page.tsx" "$page_content"
write_content "edit/[id]/loading.tsx" "$loading_content"
write_content "edit/[id]/error.tsx" "$error_content"

# Create json directory inside _constants and its index.ts file
mkdir -p _constants/json
touch _constants/json/index.ts

echo "Module $module_name with sub-module $sub_module_name created successfully!"
