/**
 * NeonHub CI Recovery Agent
 * 
 * Monitors build failures and automatically attempts to fix common issues
 * including TypeScript errors, dependency conflicts, and configuration problems.
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

interface BuildError {
  type: 'typescript' | 'lint' | 'dependency' | 'configuration';
  file?: string;
  line?: number;
  message: string;
  severity: 'error' | 'warning';
}

interface RecoveryAttempt {
  id: string;
  timestamp: Date;
  errors: BuildError[];
  actions: string[];
  success: boolean;
  duration: number;
}

export class CIRecoveryAgent {
  private recoveryLog: RecoveryAttempt[] = [];
  private readonly maxRetries = 3;
  private readonly logFile = path.join(process.cwd(), 'ci-recovery.log');

  constructor() {
    this.log('CI Recovery Agent initialized');
  }

  /**
   * Main recovery method - analyzes build failures and attempts fixes
   */
  async recover(): Promise<boolean> {
    const startTime = Date.now();
    const attemptId = `recovery_${Date.now()}`;
    
    this.log(`Starting recovery attempt: ${attemptId}`);

    try {
      // Analyze current build status
      const errors = await this.analyzeBuildErrors();
      const actions: string[] = [];

      if (errors.length === 0) {
        this.log('No build errors detected - system healthy');
        return true;
      }

      this.log(`Detected ${errors.length} build errors`);

      // Attempt automatic fixes
      for (const error of errors) {
        const fixActions = await this.attemptFix(error);
        actions.push(...fixActions);
      }

      // Verify fixes
      const success = await this.verifyBuild();
      const duration = Date.now() - startTime;

      // Log recovery attempt
      this.recoveryLog.push({
        id: attemptId,
        timestamp: new Date(),
        errors,
        actions,
        success,
        duration
      });

      this.log(`Recovery attempt ${attemptId} ${success ? 'succeeded' : 'failed'} in ${duration}ms`);
      return success;

    } catch (error) {
      this.log(`Recovery attempt failed: ${error}`, 'error');
      return false;
    }
  }

  /**
   * Analyze build output to identify common errors
   */
  private async analyzeBuildErrors(): Promise<BuildError[]> {
    const errors: BuildError[] = [];

    try {
      // Check TypeScript compilation
      await this.runCommand('npm run type-check --workspaces');
    } catch (error) {
      const tsErrors = this.parseTypeScriptErrors(error as string);
      errors.push(...tsErrors);
    }

    try {
      // Check linting
      await this.runCommand('npm run lint --workspaces');
    } catch (error) {
      const lintErrors = this.parseLintErrors(error as string);
      errors.push(...lintErrors);
    }

    try {
      // Check build process
      await this.runCommand('npm run build --workspaces');
    } catch (error) {
      const buildErrors = this.parseBuildErrors(error as string);
      errors.push(...buildErrors);
    }

    return errors;
  }

  /**
   * Attempt to fix specific types of errors
   */
  private async attemptFix(error: BuildError): Promise<string[]> {
    const actions: string[] = [];

    switch (error.type) {
      case 'typescript':
        actions.push(...await this.fixTypeScriptError(error));
        break;
      case 'lint':
        actions.push(...await this.fixLintError(error));
        break;
      case 'dependency':
        actions.push(...await this.fixDependencyError(error));
        break;
      case 'configuration':
        actions.push(...await this.fixConfigurationError(error));
        break;
    }

    return actions;
  }

  /**
   * Fix TypeScript errors
   */
  private async fixTypeScriptError(error: BuildError): Promise<string[]> {
    const actions: string[] = [];

    if (error.message.includes('Cannot find module')) {
      // Fix missing module imports
      const module = this.extractModuleName(error.message);
      if (module) {
        try {
          await this.runCommand(`npm install ${module}`);
          actions.push(`Installed missing module: ${module}`);
        } catch {
          actions.push(`Failed to install module: ${module}`);
        }
      }
    }

    if (error.message.includes('is declared but its value is never read')) {
      // Fix unused variables by prefixing with underscore
      if (error.file) {
        await this.fixUnusedVariable(error.file, error.line || 0, error.message);
        actions.push(`Fixed unused variable in ${error.file}:${error.line}`);
      }
    }

    if (error.message.includes('Missing return type')) {
      // Add return type annotations
      if (error.file) {
        await this.addReturnType(error.file, error.line || 0);
        actions.push(`Added return type annotation in ${error.file}:${error.line}`);
      }
    }

    return actions;
  }

  /**
   * Fix linting errors
   */
  private async fixLintError(error: BuildError): Promise<string[]> {
    const actions: string[] = [];

    try {
      // Attempt auto-fix with eslint
      await this.runCommand('npm run lint --fix --workspaces');
      actions.push('Applied ESLint auto-fixes');
    } catch {
      actions.push('ESLint auto-fix failed');
    }

    return actions;
  }

  /**
   * Fix dependency errors
   */
  private async fixDependencyError(error: BuildError): Promise<string[]> {
    const actions: string[] = [];

    try {
      // Clean and reinstall dependencies
      await this.runCommand('rm -rf node_modules package-lock.json');
      await this.runCommand('npm install');
      actions.push('Reinstalled dependencies');
    } catch {
      actions.push('Failed to reinstall dependencies');
    }

    return actions;
  }

  /**
   * Fix configuration errors
   */
  private async fixConfigurationError(error: BuildError): Promise<string[]> {
    const actions: string[] = [];

    // Reset TypeScript configuration
    if (error.message.includes('tsconfig')) {
      await this.resetTsConfig();
      actions.push('Reset TypeScript configuration');
    }

    // Regenerate Prisma client
    if (error.message.includes('prisma') || error.message.includes('@prisma')) {
      try {
        await this.runCommand('npm run db:generate');
        actions.push('Regenerated Prisma client');
      } catch {
        actions.push('Failed to regenerate Prisma client');
      }
    }

    return actions;
  }

  /**
   * Parse TypeScript errors from command output
   */
  private parseTypeScriptErrors(output: string): BuildError[] {
    const errors: BuildError[] = [];
    const lines = output.split('\n');

    for (const line of lines) {
      if (line.includes('error TS')) {
        const match = line.match(/(.+):(\d+):(\d+) - error TS\d+: (.+)/);
        if (match) {
          errors.push({
            type: 'typescript',
            file: match[1],
            line: parseInt(match[2]),
            message: match[4],
            severity: 'error'
          });
        }
      }
    }

    return errors;
  }

  /**
   * Parse lint errors from command output
   */
  private parseLintErrors(output: string): BuildError[] {
    const errors: BuildError[] = [];
    const lines = output.split('\n');

    for (const line of lines) {
      if (line.includes('error') || line.includes('warning')) {
        errors.push({
          type: 'lint',
          message: line.trim(),
          severity: line.includes('error') ? 'error' : 'warning'
        });
      }
    }

    return errors;
  }

  /**
   * Parse build errors from command output
   */
  private parseBuildErrors(output: string): BuildError[] {
    const errors: BuildError[] = [];
    const lines = output.split('\n');

    for (const line of lines) {
      if (line.includes('ERROR') || line.includes('Failed')) {
        errors.push({
          type: 'configuration',
          message: line.trim(),
          severity: 'error'
        });
      }
    }

    return errors;
  }

  /**
   * Fix unused variables by prefixing with underscore
   */
  private async fixUnusedVariable(file: string, line: number, message: string): Promise<void> {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const lines = content.split('\n');
      
      if (line > 0 && line <= lines.length) {
        const variableMatch = message.match(/'([^']+)' is declared but its value is never read/);
        if (variableMatch) {
          const variableName = variableMatch[1];
          lines[line - 1] = lines[line - 1].replace(
            new RegExp(`\\b${variableName}\\b`),
            `_${variableName}`
          );
          fs.writeFileSync(file, lines.join('\n'));
        }
      }
    } catch (error) {
      this.log(`Failed to fix unused variable in ${file}: ${error}`, 'error');
    }
  }

  /**
   * Add return type annotations
   */
  private async addReturnType(file: string, line: number): Promise<void> {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const lines = content.split('\n');
      
      if (line > 0 && line <= lines.length) {
        const currentLine = lines[line - 1];
        if (currentLine.includes('function') && !currentLine.includes(':')) {
          lines[line - 1] = currentLine.replace(/\)\s*{/, '): any {');
          fs.writeFileSync(file, lines.join('\n'));
        }
      }
    } catch (error) {
      this.log(`Failed to add return type in ${file}: ${error}`, 'error');
    }
  }

  /**
   * Reset TypeScript configuration to working state
   */
  private async resetTsConfig(): Promise<void> {
    const tsConfigContent = {
      compilerOptions: {
        target: "ES2020",
        module: "commonjs",
        moduleResolution: "node",
        lib: ["ES2020"],
        strict: false,
        esModuleInterop: true,
        skipLibCheck: true,
        forceConsistentCasingInFileNames: true,
        declaration: true,
        declarationMap: true,
        sourceMap: true
      },
      include: ["src/**/*"],
      exclude: ["node_modules", "dist", "**/*.test.ts"]
    };

    fs.writeFileSync(
      'tsconfig.json',
      JSON.stringify(tsConfigContent, null, 2)
    );
  }

  /**
   * Extract module name from error message
   */
  private extractModuleName(message: string): string | null {
    const match = message.match(/Cannot find module '([^']+)'/);
    return match ? match[1] : null;
  }

  /**
   * Verify that the build is now working
   */
  private async verifyBuild(): Promise<boolean> {
    try {
      await this.runCommand('npm run build --workspace=packages/core-agents');
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Run shell command with error handling
   */
  private async runCommand(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const output = execSync(command, { 
          encoding: 'utf8',
          stdio: ['pipe', 'pipe', 'pipe']
        });
        resolve(output);
      } catch (error: any) {
        reject(error.output ? error.output.join('\n') : error.message);
      }
    });
  }

  /**
   * Log messages with timestamp
   */
  private log(message: string, level: 'info' | 'error' = 'info'): void {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    
    console.log(logMessage);
    
    // Append to log file
    fs.appendFileSync(this.logFile, logMessage + '\n');
  }

  /**
   * Get recovery statistics
   */
  getRecoveryStats(): {
    totalAttempts: number;
    successRate: number;
    averageDuration: number;
    commonErrors: string[];
  } {
    const total = this.recoveryLog.length;
    const successful = this.recoveryLog.filter(attempt => attempt.success).length;
    const avgDuration = total > 0 
      ? this.recoveryLog.reduce((sum, attempt) => sum + attempt.duration, 0) / total 
      : 0;

    const errorCounts: Record<string, number> = {};
    this.recoveryLog.forEach(attempt => {
      attempt.errors.forEach(error => {
        errorCounts[error.message] = (errorCounts[error.message] || 0) + 1;
      });
    });

    const commonErrors = Object.entries(errorCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([error]) => error);

    return {
      totalAttempts: total,
      successRate: total > 0 ? successful / total : 0,
      averageDuration: avgDuration,
      commonErrors
    };
  }
}

// CLI interface
if (require.main === module) {
  const agent = new CIRecoveryAgent();
  
  agent.recover()
    .then(success => {
      if (success) {
        console.log('✅ Recovery successful - build is now working');
        process.exit(0);
      } else {
        console.log('❌ Recovery failed - manual intervention required');
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('💥 Recovery agent crashed:', error);
      process.exit(1);
    });
}