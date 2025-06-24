#!/usr/bin/env node

const { execSync, spawn } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const chokidar = require('chokidar');

class UIRefinementScript {
  constructor() {
    this.isRunning = false;
    this.debounceTimer = null;
    this.logPath = path.join(process.cwd(), 'logs', 'ui-refinements.log');
  }

  async init() {
    await this.log('🎨 UI Refinement Agent - Starting...');
    
    // Ensure logs directory exists
    await fs.mkdir(path.dirname(this.logPath), { recursive: true });
    
    // Initial scan
    await this.runUIRefinement();
    
    // Watch for file changes
    await this.watchFiles();
  }

  async watchFiles() {
    const watcher = chokidar.watch([
      'apps/dashboard/src/**/*.tsx',
      'apps/dashboard/src/**/*.ts',
      'apps/dashboard/src/**/*.css'
    ], {
      ignored: /node_modules/,
      persistent: true
    });

    watcher.on('change', (filePath) => {
      this.log(`📁 File changed: ${filePath}`);
      this.debounceRefinement();
    });

    watcher.on('add', (filePath) => {
      this.log(`➕ File added: ${filePath}`);
      this.debounceRefinement();
    });

    await this.log('👀 Watching for UI file changes...');
  }

  debounceRefinement() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    
    this.debounceTimer = setTimeout(() => {
      if (!this.isRunning) {
        this.runUIRefinement();
      }
    }, 1000); // Wait 1 second after last change
  }

  async runUIRefinement() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    await this.log('🔍 Running UI refinement analysis...');
    
    try {
      // Check for contrast issues
      await this.checkContrast();
      
      // Auto-fix issues if enabled
      if (process.env.UI_AUTO_FIX === 'true') {
        await this.autoFixIssues();
      }
      
      // Validate accessibility
      await this.validateAccessibility();
      
      // Check theme consistency
      await this.checkThemeConsistency();
      
      await this.log('✅ UI refinement analysis completed');
      
    } catch (error) {
      await this.log(`❌ UI refinement failed: ${error.message}`);
      await this.log(`ERROR: ${error.message}`);
    } finally {
      this.isRunning = false;
    }
  }

  async checkContrast() {
    await this.log('  🎯 Checking contrast ratios...');
    
    const contrastIssues = await this.findContrastIssues();
    
    if (contrastIssues.length > 0) {
      await this.log(`  ⚠️  Found ${contrastIssues.length} contrast issues`);
      
      for (const issue of contrastIssues.slice(0, 5)) { // Show first 5
        await this.log(`    📍 ${issue.file}:${issue.line} - ${issue.description}`);
      }
      
      if (contrastIssues.length > 5) {
        await this.log(`    ... and ${contrastIssues.length - 5} more`);
      }
      
      await this.log(`Found ${contrastIssues.length} contrast issues`);
    } else {
      await this.log('  ✅ No contrast issues found');
    }
  }

  async autoFixIssues() {
    await this.log('  🔧 Auto-fixing UI issues...');
    
    const fixes = await this.applyContrastFixes();
    
    if (fixes.length > 0) {
      await this.log(`  ✨ Applied ${fixes.length} automatic fixes`);
      
      // Create a commit with the fixes
      if (process.env.UI_AUTO_COMMIT === 'true') {
        await this.commitFixes(fixes);
      }
      
      await this.log(`Applied ${fixes.length} automatic fixes`);
    }
  }

  async validateAccessibility() {
    console.log('  ♿ Validating accessibility...');
    
    const a11yIssues = await this.findAccessibilityIssues();
    
    if (a11yIssues.length > 0) {
      await this.log(`  ⚠️  Found ${a11yIssues.length} accessibility issues`);
      await this.log(`Found ${a11yIssues.length} accessibility issues`);
    } else {
      await this.log('  ✅ No accessibility issues found');
    }
  }

  async checkThemeConsistency() {
    await this.log('  🎨 Checking theme consistency...');
    
    const themeIssues = await this.findThemeInconsistencies();
    
    if (themeIssues.length > 0) {
      await this.log(`  ⚠️  Found ${themeIssues.length} theme inconsistencies`);
      await this.log(`Found ${themeIssues.length} theme inconsistencies`);
    } else {
      await this.log('  ✅ Theme consistency looks good');
    }
  }

  async findContrastIssues() {
    const issues = [];
    const tsxFiles = await this.findTSXFiles('apps/dashboard/src');
    
    for (const file of tsxFiles) {
      try {
        const content = await fs.readFile(file, 'utf-8');
        const lines = content.split('\n');
        
        lines.forEach((line, index) => {
          // Check for common contrast problems
          const contrastProblems = [
            { bg: 'bg-neutral-900', text: 'text-neutral-700', fix: 'text-neutral-100' },
            { bg: 'bg-neutral-900', text: 'text-neutral-600', fix: 'text-neutral-100' },
            { bg: 'bg-neutral-900', text: 'text-neutral-500', fix: 'text-neutral-200' },
            { bg: 'bg-dark-900', text: 'text-dark-700', fix: 'text-dark-100' },
            { bg: 'bg-dark-900', text: 'text-dark-600', fix: 'text-dark-100' },
            { bg: 'bg-slate-900', text: 'text-slate-700', fix: 'text-slate-100' },
          ];
          
          contrastProblems.forEach(problem => {
            if (line.includes(problem.bg) && line.includes(problem.text)) {
              issues.push({
                file: path.relative(process.cwd(), file),
                line: index + 1,
                description: `Poor contrast: ${problem.text} on ${problem.bg}`,
                fix: problem.fix,
                severity: 'high'
              });
            }
          });
        });
      } catch (error) {
        // Skip files that can't be read
      }
    }
    
    return issues;
  }

  async applyContrastFixes() {
    const fixes = [];
    const tsxFiles = await this.findTSXFiles('apps/dashboard/src');
    
    const contrastFixes = {
      'bg-neutral-900': {
        'text-neutral-700': 'text-neutral-100',
        'text-neutral-600': 'text-neutral-100',
        'text-neutral-500': 'text-neutral-200',
      },
      'bg-dark-900': {
        'text-dark-700': 'text-dark-100',
        'text-dark-600': 'text-dark-100',
        'text-dark-500': 'text-dark-200',
      },
      'bg-slate-900': {
        'text-slate-700': 'text-slate-100',
        'text-slate-600': 'text-slate-100',
        'text-slate-500': 'text-slate-200',
      }
    };
    
    for (const file of tsxFiles) {
      try {
        let content = await fs.readFile(file, 'utf-8');
        const originalContent = content;
        
        Object.entries(contrastFixes).forEach(([bg, textFixes]) => {
          Object.entries(textFixes).forEach(([oldText, newText]) => {
            if (content.includes(bg) && content.includes(oldText)) {
              const regex = new RegExp(`(${bg}[^"]*)(${oldText})`, 'g');
              const newContent = content.replace(regex, `$1${newText}`);
              if (newContent !== content) {
                content = newContent;
                fixes.push({
                  file: path.relative(process.cwd(), file),
                  change: `${oldText} → ${newText}`,
                  context: bg
                });
              }
            }
          });
        });
        
        if (content !== originalContent) {
          await fs.writeFile(file, content, 'utf-8');
        }
      } catch (error) {
        // Skip files that can't be processed
      }
    }
    
    return fixes;
  }

  async findAccessibilityIssues() {
    const issues = [];
    const tsxFiles = await this.findTSXFiles('apps/dashboard/src');
    
    for (const file of tsxFiles) {
      try {
        const content = await fs.readFile(file, 'utf-8');
        const lines = content.split('\n');
        
        lines.forEach((line, index) => {
          // Check for missing alt attributes
          if (line.includes('<img') && !line.includes('alt=')) {
            issues.push({
              file: path.relative(process.cwd(), file),
              line: index + 1,
              description: 'Image missing alt attribute',
              severity: 'medium'
            });
          }
          
          // Check for buttons without accessible text
          if (line.includes('<button') && !line.includes('aria-label') && 
              !line.match(/<button[^>]*>[^<]+</)) {
            issues.push({
              file: path.relative(process.cwd(), file),
              line: index + 1,
              description: 'Button may need aria-label or visible text',
              severity: 'medium'
            });
          }
          
          // Check for form inputs without labels
          if (line.includes('<input') && !line.includes('aria-label') && 
              !line.includes('id=')) {
            issues.push({
              file: path.relative(process.cwd(), file),
              line: index + 1,
              description: 'Input should have label or aria-label',
              severity: 'high'
            });
          }
        });
      } catch (error) {
        // Skip files that can't be read
      }
    }
    
    return issues;
  }

  async findThemeInconsistencies() {
    const issues = [];
    const tsxFiles = await this.findTSXFiles('apps/dashboard/src');
    
    const inconsistentColors = {
      'bg-gray-900': 'bg-dark-900',
      'bg-gray-800': 'bg-dark-800',
      'bg-gray-700': 'bg-dark-700',
      'text-gray-300': 'text-dark-300',
      'text-gray-200': 'text-dark-200',
      'text-gray-100': 'text-dark-100',
    };
    
    for (const file of tsxFiles) {
      try {
        const content = await fs.readFile(file, 'utf-8');
        
        Object.entries(inconsistentColors).forEach(([oldColor, newColor]) => {
          if (content.includes(oldColor)) {
            issues.push({
              file: path.relative(process.cwd(), file),
              description: `Use ${newColor} instead of ${oldColor} for theme consistency`,
              severity: 'low'
            });
          }
        });
      } catch (error) {
        // Skip files that can't be read
      }
    }
    
    return issues;
  }

  async findTSXFiles(dir) {
    const files = [];
    
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory() && !entry.name.startsWith('.') && 
            entry.name !== 'node_modules') {
          const subFiles = await this.findTSXFiles(fullPath);
          files.push(...subFiles);
        } else if (entry.isFile() && 
                   (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      // Directory might not exist
    }
    
    return files;
  }

  async commitFixes(fixes) {
    try {
      // Stage all modified files
      execSync('git add .', { stdio: 'inherit' });
      
      // Create commit message
      const commitMessage = `ui: auto-fix ${fixes.length} UI issues

Applied automatic fixes:
${fixes.slice(0, 10).map(fix => `- ${fix.file}: ${fix.change}`).join('\n')}
${fixes.length > 10 ? `... and ${fixes.length - 10} more` : ''}

Generated by UIRefinementAgent`;
      
      // Commit changes
      execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
      
      await this.log('  📝 Committed UI fixes to git');
      await this.log('Committed UI fixes to git');
      
    } catch (error) {
      await this.log(`  ❌ Failed to commit fixes: ${error.message}`);
    }
  }

  async log(message) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] UIRefinementAgent: ${message}\n`;
    
    try {
      await fs.appendFile(this.logPath, logEntry);
    } catch (error) {
      // Fallback to console if logging fails
      console.error('Failed to write to log file:', error);
    }
  }
}

// CLI handling
if (require.main === module) {
  const agent = new UIRefinementScript();
  
  // Handle command line options
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
UI Refinement Agent - Automatic UI/UX Issue Detection & Fixing

Usage:
  node ui-refinement-agent.js [options]

Options:
  --watch         Watch for file changes (default)
  --once          Run once and exit
  --auto-fix      Automatically fix issues
  --auto-commit   Automatically commit fixes
  --help, -h      Show this help

Environment Variables:
  UI_AUTO_FIX=true      Enable automatic fixing
  UI_AUTO_COMMIT=true   Enable automatic commits
`);
    process.exit(0);
  }
  
  if (args.includes('--auto-fix')) {
    process.env.UI_AUTO_FIX = 'true';
  }
  
  if (args.includes('--auto-commit')) {
    process.env.UI_AUTO_COMMIT = 'true';
  }
  
  if (args.includes('--once')) {
    agent.runUIRefinement().then(() => {
      console.log('✅ One-time UI analysis completed');
      process.exit(0);
    }).catch(error => {
      console.error('❌ Analysis failed:', error);
      process.exit(1);
    });
  } else {
    // Default: watch mode
    agent.init().catch(error => {
      console.error('❌ Failed to start UI Refinement Agent:', error);
      process.exit(1);
    });
  }
  
  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n👋 UI Refinement Agent shutting down...');
    process.exit(0);
  });
}

module.exports = UIRefinementScript;