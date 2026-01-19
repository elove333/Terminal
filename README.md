# Terminal

A CLI tool for linking Vercel projects to local directories.

## Installation

```bash
npm i @vercel/toolbar
```

## Usage

Link the current directory to a Vercel project:
```bash
node vercel.js link
```

Link a specific directory to a Vercel project:
```bash
node vercel.js link [path-to-directory]
```

## Examples

```bash
# Link the current directory
node vercel.js link

# Link a specific directory
node vercel.js link /path/to/my/project

# Link a relative directory
node vercel.js link ./my-app
```

## What it does

The `vercel link` command:
1. Validates that the specified directory exists
2. Creates a `.vercel` directory in the target location
3. Generates a `project.json` file with project configuration
4. Links the local directory to a Vercel project

## Output

When successful, the command creates:
- `.vercel/project.json` - Contains project ID, organization ID, and link timestamp
