# Adding Vercel MCP to Claude Code

This guide shows you how to integrate Vercel's Model Context Protocol (MCP) with Claude Code in VS Code, allowing Claude to directly interact with your Vercel deployments.

## What is Vercel MCP?

The Vercel MCP allows Claude Code to:
- Deploy projects to Vercel
- Check deployment status
- View deployment logs
- Manage environment variables
- And more, all without leaving VS Code

## Prerequisites

1. Claude Code extension installed in VS Code
2. Vercel account
3. Vercel CLI installed: `npm install -g vercel`
4. Vercel authentication token

## Step 1: Get Your Vercel Token

1. Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Click "Create Token"
3. Give it a name: "Claude Code MCP"
4. Set expiration (recommend: No Expiration for development)
5. Copy the token (starts with `v1_` or similar)
6. **Save it securely** - you won't see it again!

## Step 2: Configure Claude Code MCP Settings

### Option A: Using VS Code Settings UI

1. Open VS Code Settings (Ctrl+,)
2. Search for "claude code mcp"
3. Find "Claude Code: MCP Servers"
4. Click "Edit in settings.json"

### Option B: Direct settings.json Edit

1. Open Command Palette (Ctrl+Shift+P)
2. Type: "Preferences: Open User Settings (JSON)"
3. Add the Vercel MCP configuration

## Step 3: Add Vercel MCP Configuration

Add this to your VS Code `settings.json`:

```json
{
  "claude-code.mcpServers": {
    "vercel": {
      "command": "npx",
      "args": ["-y", "@vercel/mcp"],
      "env": {
        "VERCEL_TOKEN": "your-vercel-token-here"
      }
    }
  }
}
```

**Replace `your-vercel-token-here` with your actual Vercel token.**

## Step 4: Alternative - Use .env File (More Secure)

Instead of putting the token directly in settings.json:

1. Create a `.env` file in your project root:
   ```bash
   VERCEL_TOKEN=your-vercel-token-here
   ```

2. Add to `.gitignore`:
   ```
   .env
   ```

3. Update settings.json to use environment variable:
   ```json
   {
     "claude-code.mcpServers": {
       "vercel": {
         "command": "npx",
         "args": ["-y", "@vercel/mcp"],
         "env": {
           "VERCEL_TOKEN": "${env:VERCEL_TOKEN}"
         }
       }
     }
   }
   ```

## Step 5: Reload VS Code

1. Close and reopen VS Code
2. Or: Ctrl+Shift+P → "Developer: Reload Window"

## Step 6: Verify MCP is Working

1. Open Claude Code chat
2. Ask Claude: "Can you check my Vercel deployments?"
3. Claude should now be able to interact with Vercel

## What You Can Do with Vercel MCP

Once set up, you can ask Claude to:

### Deploy Your Project
```
"Deploy this project to Vercel"
```

### Check Deployment Status
```
"What's the status of my latest deployment?"
```

### View Logs
```
"Show me the logs for my last deployment"
```

### Manage Environment Variables
```
"Add a new environment variable RESEND_API_KEY to my Vercel project"
```

### List Projects
```
"Show me all my Vercel projects"
```

### Get Deployment URLs
```
"What's the URL of my production deployment?"
```

## Complete Settings.json Example

Here's a full example with multiple MCP servers:

```json
{
  "claude-code.mcpServers": {
    "vercel": {
      "command": "npx",
      "args": ["-y", "@vercel/mcp"],
      "env": {
        "VERCEL_TOKEN": "v1_xxxxxxxxxxxxxxxxxxxxxxxxxx"
      }
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@github/mcp"],
      "env": {
        "GITHUB_TOKEN": "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxx"
      }
    }
  }
}
```

## Troubleshooting

### MCP Not Loading
1. Check token is correct
2. Verify npx is installed: `npx --version`
3. Check VS Code Developer Console (Help → Toggle Developer Tools)
4. Look for MCP-related errors

### Permission Errors
- Make sure your Vercel token has the necessary scopes
- Create a new token with full access

### Commands Not Working
- Reload VS Code after changing settings
- Check that `@vercel/mcp` package is accessible
- Try running manually: `npx -y @vercel/mcp`

## Security Best Practices

⚠️ **Important Security Notes:**

1. **Never commit tokens to Git**
   - Add settings.json to .gitignore if it contains tokens
   - Use .env file for sensitive data

2. **Use workspace settings for team projects**
   - User settings: `%APPDATA%\Code\User\settings.json`
   - Workspace settings: `.vscode/settings.json` (be careful!)

3. **Rotate tokens regularly**
   - Regenerate tokens every 90 days
   - Revoke old tokens in Vercel dashboard

4. **Limit token scope**
   - Only grant necessary permissions
   - Create separate tokens for different projects

## Alternative: Project-Specific Configuration

For a single project, create `.vscode/settings.json` in your project:

```json
{
  "claude-code.mcpServers": {
    "vercel": {
      "command": "npx",
      "args": ["-y", "@vercel/mcp"],
      "env": {
        "VERCEL_TOKEN": "${env:VERCEL_TOKEN}"
      }
    }
  }
}
```

Then set the environment variable before opening VS Code:
```bash
set VERCEL_TOKEN=your-token
code .
```

## Helpful Commands After Setup

Once Vercel MCP is configured, try these with Claude:

1. **Initial deployment:**
   ```
   "Deploy my Stellatus project to Vercel and set up the environment variables for Resend"
   ```

2. **Check status:**
   ```
   "Is my Stellatus site deployed successfully?"
   ```

3. **View logs:**
   ```
   "Show me the latest function logs for the submit-download API"
   ```

4. **Update env vars:**
   ```
   "Update the RESEND_API_KEY environment variable in production"
   ```

## Resources

- Vercel MCP Docs: https://vercel.com/docs/mcp
- Claude Code MCP Guide: https://docs.claude.com/claude-code/mcp
- Vercel CLI Docs: https://vercel.com/docs/cli

## Benefits of Using MCP

✓ Deploy directly from Claude Code
✓ Real-time deployment status
✓ Quick environment variable management
✓ Access logs without leaving VS Code
✓ Faster iteration and debugging
✓ Better integration with AI workflow

## Next Steps

After setting up MCP:
1. Deploy your Stellatus download page
2. Set up environment variables via Claude
3. Test the download form
4. Monitor logs for submissions
5. Iterate based on user behavior

Need help? Ask Claude: "How do I use the Vercel MCP to deploy my project?"