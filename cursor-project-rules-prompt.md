# 🎯 Cursor Project Rules & Development Guidelines Generator

## 🤖 **SYSTEM PROMPT** 

```
You are an expert developer productivity specialist and AI-assisted development consultant. You're creating comprehensive Cursor project rules that will enable highly effective AI-assisted development for the Campaign AI project.

## PROJECT CONTEXT: Campaign AI
- **Type**: Enterprise social media management platform with AI agents
- **Tech Stack**: Next.js 15, TypeScript, React, Winston logging, PostgreSQL, NextAuth v5
- **Scale**: Production-ready enterprise application with 100+ components
- **Team**: AI-assisted development with focus on velocity and quality

## ESTABLISHED PATTERNS & INFRASTRUCTURE:
- **Enterprise Logging**: Winston with structured logging and createModuleLogger()
- **Pre-commit Hooks**: Automated quality gates blocking console statements
- **Sprint Automation**: Intelligent planning and feature scaffolding
- **Code Generation**: Handlebars templates with enterprise patterns
- **Type Safety**: Comprehensive TypeScript with strict mode
- **Testing**: Jest with enterprise mocking patterns
- **Internationalization**: next-intl with 9 language support

## CURSOR RULES OBJECTIVES:

### 🎯 **AI DEVELOPMENT EFFECTIVENESS**
Create rules that enable AI to:
- Generate code that follows all established patterns automatically
- Understand the codebase architecture and make informed decisions
- Provide contextually relevant suggestions and completions
- Respect enterprise patterns and quality standards
- Integrate seamlessly with existing infrastructure

### 🏗️ **ARCHITECTURE AWARENESS**
Ensure AI understands:
- Component organization and naming conventions
- API route structure and patterns
- Database interaction patterns
- Error handling and logging standards
- Testing strategies and mocking approaches
- i18n implementation patterns

### 🔧 **PRODUCTIVITY OPTIMIZATION**
Enable AI to:
- Suggest optimal file locations and naming
- Generate boilerplate code with patterns included
- Provide intelligent refactoring suggestions
- Assist with debugging and troubleshooting
- Recommend performance optimizations

## SPECIFIC RULE CATEGORIES NEEDED:

### **🏗️ ARCHITECTURE & STRUCTURE RULES**
- File organization principles and conventions
- Component structure and naming patterns
- API route organization and patterns
- Type definition management
- Asset and resource organization

### **📝 CODING STANDARDS RULES**
- TypeScript best practices and strictness
- React component patterns and conventions
- Error handling and logging requirements
- Performance optimization guidelines
- Accessibility implementation standards

### **🔧 DEVELOPMENT WORKFLOW RULES**
- Git workflow and branch naming
- Commit message conventions
- PR review and testing requirements
- Code generation and scaffolding usage
- Sprint and feature development process

### **🧪 TESTING & QUALITY RULES**
- Testing strategy and coverage requirements
- Mock implementation patterns
- Integration testing approaches
- Quality gate compliance
- Performance testing guidelines

### **🌐 BUSINESS DOMAIN RULES**
- Social media platform integration patterns
- AI content generation best practices
- Multi-platform content handling
- User authentication and authorization
- Analytics and monitoring implementation

## CURSOR FEATURES TO LEVERAGE:

### **Autocomplete & Suggestions**
- Context-aware code completions
- Pattern-based suggestions
- Enterprise logging integration
- Type-safe implementations

### **Chat Integration**
- Architecture-aware responses
- Pattern recognition and application
- Debugging assistance
- Refactoring recommendations

### **File Management**
- Intelligent file creation and organization
- Template-based generation
- Dependency management
- Import optimization

## SPECIFIC PATTERNS TO ENCODE:

### **Component Creation Pattern**
```typescript
'use client';
import { createModuleLogger } from '@/lib/logging/logger';
import { useTranslations } from 'next-intl';

const logger = createModuleLogger('component-name');

interface ComponentProps {
  // Props with proper TypeScript typing
}

export default function ComponentName({ ...props }: ComponentProps) {
  const t = useTranslations('ComponentName');
  
  // Component implementation with logging
}
```

### **API Route Pattern**
```typescript
import { createModuleLogger } from '@/lib/logging/logger';
import { NextRequest, NextResponse } from 'next/server';

const logger = createModuleLogger('api-route-name');

export async function GET(request: NextRequest) {
  // Implementation with logging and error handling
}
```

### **Error Handling Pattern**
```typescript
import { ErrorFactory } from '@/lib/errors/enhanced-error';

try {
  // Operation
} catch (error) {
  const enhancedError = ErrorFactory.createError(
    'Operation failed',
    { context: { /* relevant context */ } }
  );
  logger.error('Operation failed', { error: enhancedError });
  throw enhancedError;
}
```

## RULE STRUCTURE REQUIREMENTS:

### **Format Specifications**
- Use Cursor-compatible syntax and formatting
- Include specific file path patterns
- Provide clear do/don't examples
- Include reasoning for each rule
- Specify exception conditions

### **Scope Definitions**
- File type specific rules (*.tsx, *.ts, *.json)
- Directory specific behaviors
- Context-aware suggestions
- Integration with existing tools

### **Performance Considerations**
- Rules that don't slow down IDE performance
- Efficient pattern matching
- Minimal computational overhead
- Smart caching of suggestions

## SUCCESS CRITERIA:

The Cursor rules should result in:
- ✅ AI automatically follows established patterns
- ✅ Code generation includes logging and error handling
- ✅ Suggestions respect enterprise architecture
- ✅ New developers guided toward best practices
- ✅ Consistent code quality across all AI-generated code

Please generate comprehensive Cursor project rules that will enable highly effective AI-assisted development for this enterprise Next.js application.
```

---

## 👤 **USER PROMPT** (Copy this to generate rules)

```
I need comprehensive Cursor project rules that will make AI development incredibly effective for my Campaign AI project. The rules should enable AI to understand my architecture and automatically generate code that follows all my established patterns.

**MY PROJECT DETAILS:**

## **🏗️ CURRENT ARCHITECTURE**
- **Next.js 15** with TypeScript and React
- **Enterprise Logging** with createModuleLogger() patterns
- **Pre-commit Hooks** that block console statements and enforce patterns
- **Sprint Automation** with feature scaffolding and code generation
- **Internationalization** with next-intl in 9 languages
- **Authentication** with NextAuth v5
- **Database** with PostgreSQL and type-safe queries

## **📁 FILE STRUCTURE PATTERNS**
```
src/
├── app/
│   ├── [locale]/           # i18n pages
│   ├── api/               # API routes
│   └── globals.css
├── components/            # React components
├── lib/
│   ├── logging/          # Enterprise logging
│   ├── errors/           # Error handling
│   └── utils/            # Utilities
├── types/                # TypeScript definitions
└── messages/             # i18n translations
```

## **🎯 ESTABLISHED PATTERNS TO ENFORCE**

### **Logging Pattern (CRITICAL)**
```typescript
import { createModuleLogger } from '@/lib/logging/logger';
const logger = createModuleLogger('module-name');

// Usage
logger.info('Operation started', { context });
logger.error('Operation failed', { error, context });
```

### **Component Pattern**
```typescript
'use client';
import { createModuleLogger } from '@/lib/logging/logger';
import { useTranslations } from 'next-intl';

const logger = createModuleLogger('component-name');

interface Props {
  // TypeScript props
}

export default function ComponentName({ ...props }: Props) {
  const t = useTranslations('ComponentName');
  // Implementation
}
```

### **API Route Pattern**
```typescript
import { createModuleLogger } from '@/lib/logging/logger';
import { NextRequest, NextResponse } from 'next/server';

const logger = createModuleLogger('api-route');

export async function POST(request: NextRequest) {
  // Implementation with logging
}
```

### **Error Handling Pattern**
```typescript
import { ErrorFactory } from '@/lib/errors/enhanced-error';

try {
  // Operation
} catch (error) {
  const enhancedError = ErrorFactory.createError('Message', { context });
  logger.error('Operation failed', { error: enhancedError });
  throw enhancedError;
}
```

## **🚫 PATTERNS TO BLOCK**
- **Console statements** (console.log, console.error, etc.) - Use logging instead
- **Direct API calls** without error handling
- **Components without TypeScript interfaces**
- **Missing i18n integration** in user-facing components
- **Database queries** without proper error handling

## **🎯 WHAT I WANT CURSOR RULES TO DO**

### **1. Auto-Generate Correct Patterns**
When I create new files, Cursor should:
- Automatically include proper imports
- Generate logging setup
- Include TypeScript interfaces
- Add i18n integration for components
- Follow naming conventions

### **2. Context-Aware Suggestions**
- Suggest appropriate logging levels and context
- Recommend proper error handling patterns
- Provide TypeScript type suggestions
- Suggest i18n key patterns

### **3. Architecture Guidance**
- Guide file placement in correct directories
- Suggest appropriate module logger names
- Recommend proper component organization
- Assist with API route structure

### **4. Quality Enforcement**
- Prevent console statement usage
- Ensure TypeScript types are included
- Validate logging patterns are used
- Check error handling is implemented

### **5. Development Acceleration**
- Quick scaffolding of common patterns
- Intelligent code completion
- Pattern-based refactoring suggestions
- Context-aware debugging assistance

## **📋 SPECIFIC REQUIREMENTS**

### **File Type Rules**
- **`*.tsx` components**: Include logging, i18n, TypeScript
- **`*.ts` utilities**: Include logging and proper exports
- **`api/*/route.ts`**: Include logging, error handling, validation
- **`types/*.ts`**: Follow TypeScript best practices
- **`messages/*.json`**: Follow i18n key conventions

### **Directory-Specific Behavior**
- **`src/components/`**: Generate React components with full pattern
- **`src/app/api/`**: Generate API routes with enterprise patterns
- **`src/lib/`**: Generate utilities with logging
- **`__tests__/`**: Generate tests with proper mocking

### **Smart Suggestions**
- When typing "logger", suggest createModuleLogger pattern
- When creating error handling, suggest ErrorFactory
- When adding i18n, suggest useTranslations hook
- When writing API routes, suggest proper validation

## **🏆 SUCCESS METRICS**

Perfect Cursor rules should result in:
- ✅ **Zero console statements** in generated code
- ✅ **Automatic logging integration** in all files
- ✅ **Proper TypeScript typing** for all functions/components
- ✅ **Consistent error handling** patterns
- ✅ **i18n integration** in user-facing components
- ✅ **Following file organization** conventions
- ✅ **Pre-commit hook compliance** automatically

I want Cursor to become an expert in my codebase that can generate production-ready code following all my enterprise patterns automatically.

Please generate comprehensive Cursor project rules that will make AI development incredibly effective for this architecture!
```

---

## 🎯 **EXPECTED CURSOR RULES OUTPUT**

The AI should generate rules covering:

### **📁 File Organization Rules**
- Automatic file placement in correct directories
- Naming convention enforcement
- Import path optimization
- Dependency organization

### **🏗️ Architecture Pattern Rules**
- Component structure enforcement
- API route pattern generation
- Type definition standards
- Error handling requirements

### **🔧 Development Workflow Rules**
- Logging pattern automation
- i18n integration guidance
- Testing pattern suggestions
- Quality gate compliance

### **⚡ Performance Rules**
- Bundle optimization suggestions
- Lazy loading recommendations
- Efficient rendering patterns
- Memory leak prevention

This will create the ultimate AI-assisted development environment for your enterprise Next.js application! 