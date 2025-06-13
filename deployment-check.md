# Shopify-GitHub Deployment Verification Checklist

## After Making Changes & Pushing to GitHub:

### 1. **Git Push Verification**
```bash
# Check current status
git status

# Add and commit changes
git add .
git commit -m "Description of changes"

# Push to main branch (or your connected branch)
git push origin main

# Verify push was successful
git log --oneline -3
```

### 2. **Shopify Admin Verification**
- [ ] Go to **Online Store > Themes**
- [ ] Check connected theme shows **"Connected to GitHub"**
- [ ] Verify **"Last updated"** timestamp matches your push time
- [ ] Look for sync status indicator (green = success)

### 3. **Live Site Verification**
- [ ] Open your store in a new incognito/private window
- [ ] Navigate to the page you modified
- [ ] Verify changes are visible
- [ ] Check browser dev tools for any console errors

### 4. **Common Sync Issues & Solutions**

#### **If Changes Don't Appear:**
1. **Check Branch**: Ensure you pushed to the correct branch connected to Shopify
2. **Cache**: Clear browser cache or use incognito mode
3. **Time Delay**: GitHub-Shopify sync can take 1-5 minutes
4. **File Conflicts**: Check Shopify admin for sync error messages

#### **If Sync Fails:**
1. Check **Theme > Actions** in Shopify admin for error logs
2. Verify file syntax (especially JSON and Liquid files)
3. Ensure no conflicting changes were made directly in Shopify admin

### 5. **Best Practices**

#### **Before Pushing:**
- Test changes locally if possible
- Validate JSON syntax in template files
- Commit with descriptive messages

#### **After Pushing:**
- Wait 2-3 minutes for sync
- Check both Shopify admin and live site
- Document successful deployments

## Current Deployment Log

| Date | Time | Commit | Status | Notes |
|------|------|--------|---------|-------|
| [DATE] | [TIME] | Adding FCA sections to jumpseat-home | ✅ Pending | Updated page.jumpseat-home.json |

---

### Quick Commands for Development:

```bash
# Quick status check
git status && git log --oneline -3

# Quick deploy
git add . && git commit -m "Update: [description]" && git push origin main

# Check remote sync
git fetch && git status
``` 