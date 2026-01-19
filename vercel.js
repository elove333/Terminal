#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Vercel Link CLI - Links a local directory to a Vercel project
 * Usage: vercel link [path-to-directory]
 */

function main() {
  const args = process.argv.slice(2);
  
  // Check if the command is 'link'
  if (args.length === 0 || args[0] !== 'link') {
    console.log('Usage: vercel link [path-to-directory]');
    process.exit(1);
  }

  // Get the directory path (default to current directory if not provided)
  const targetDir = args[1] ? path.resolve(args[1]) : process.cwd();

  // Validate that the directory exists
  if (!fs.existsSync(targetDir)) {
    console.error(`Error: Directory "${targetDir}" does not exist.`);
    process.exit(1);
  }

  // Validate that it's a directory
  if (!fs.statSync(targetDir).isDirectory()) {
    console.error(`Error: "${targetDir}" is not a directory.`);
    process.exit(1);
  }

  // Create .vercel directory if it doesn't exist
  const vercelDir = path.join(targetDir, '.vercel');
  if (!fs.existsSync(vercelDir)) {
    fs.mkdirSync(vercelDir, { recursive: true });
    console.log(`Created .vercel directory in ${targetDir}`);
  }

  // Create a project.json file to simulate the link
  const projectConfig = {
    projectId: `prj_${Date.now()}`,
    orgId: `org_${Date.now()}`,
    linkedAt: new Date().toISOString(),
    path: targetDir
  };

  const projectJsonPath = path.join(vercelDir, 'project.json');
  fs.writeFileSync(projectJsonPath, JSON.stringify(projectConfig, null, 2));

  console.log(`✓ Linked to ${targetDir}`);
  console.log(`✓ Project configuration saved to ${projectJsonPath}`);
  console.log(`\nProject ID: ${projectConfig.projectId}`);
  console.log(`Organization ID: ${projectConfig.orgId}`);
}

// Run the CLI
main();
