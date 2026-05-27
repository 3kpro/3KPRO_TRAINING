export const courseMap = [
  {
    id: 'devops',
    title: 'DevOps',
    description: 'Learn Version Control, CI/CD, Docker, and Kubernetes.',
    lessons: [
      { 
        id: 'git', 
        title: 'Version Control (Git)', 
        file: 'devops/git.md',
        lab: {
          title: 'Interactive Staging',
          objective: 'Master the art of interactive staging. Use the correct command to stage specific hunks of changes rather than the entire file.',
          hint: 'The command is a variation of "git add". Think about the "patch" flag.',
          validate: (val) => val.toLowerCase().includes('git add -p')
        }
      },
      { 
        id: 'cicd', 
        title: 'CI/CD Pipelines', 
        file: 'devops/cicd.md',
        lab: {
          title: 'Pipeline Triggers',
          objective: 'Define a manual trigger for a workflow. Which keyword in a GitHub Action YAML file allows for manual execution?',
          hint: 'It starts with "workflow_".',
          validate: (val) => val.toLowerCase().includes('workflow_dispatch')
        }
      },
      { id: 'docker', title: 'Containerization (Docker)', file: 'devops/docker.md' },
      { id: 'k8s', title: 'Orchestration (Kubernetes)', file: 'devops/k8s.md' },
    ],
  },
  {
    id: 'iac',
    title: 'Infrastructure as Code (IaC)',
    description: 'Master Terraform and Azure Bicep.',
    lessons: [
      { id: 'intro', title: 'Declarative vs. Imperative', file: 'iac/intro.md' },
      { 
        id: 'terraform', 
        title: 'Terraform Basics & State', 
        file: 'iac/terraform.md',
        lab: {
          title: 'State Initialization',
          objective: 'You have just cloned a Terraform repo. What is the first command you must run to download providers and initialize the backend?',
          hint: 'It starts with "terraform i...".',
          validate: (val) => val.toLowerCase().includes('terraform init')
        }
      },
      { id: 'bicep', title: 'Azure Bicep Fundamentals', file: 'iac/bicep.md' },
    ],
  },
  {
    id: 'python',
    title: 'Python',
    description: 'Syntax, Scripting, and APIs.',
    lessons: [
      { id: 'syntax', title: 'Syntax & Data Structures', file: 'python/syntax.md' },
      { 
        id: 'scripting', 
        title: 'Automation & Scripting', 
        file: 'python/scripting.md',
        lab: {
          title: 'Path Discovery',
          objective: 'Using the modern pathlib library, how do you get the current user\'s home directory path?',
          hint: 'It\'s a class method on Path. Think "Path.h...()"',
          validate: (val) => val.toLowerCase().includes('path.home()')
        }
      },
      { id: 'apis', title: 'API Interactions (Requests)', file: 'python/apis.md' },
    ],
  },
  {
    id: 'scripting',
    title: 'PowerShell & Bash',
    description: 'Master cross-platform scripting and OS management.',
    lessons: [
      { id: 'core', title: 'Core Cmdlets/Commands', file: 'scripting/core.md' },
      { 
        id: 'pipeline', 
        title: 'Pipeline Manipulation', 
        file: 'scripting/pipeline.md',
        lab: {
          title: 'Object Discovery',
          objective: 'In PowerShell, what command do you pipe an object to in order to see all of its available properties and methods?',
          hint: 'It starts with "Get-M...".',
          validate: (val) => val.toLowerCase().includes('get-member')
        }
      },
      { id: 'reusable', title: 'Writing Reusable Scripts', file: 'scripting/reusable.md' },
      { id: 'os', title: 'OS Management', file: 'scripting/os.md' },
    ],
  },
  {
    id: 'azure104',
    title: 'Azure 104 (Administrator)',
    description: 'Identities, Networking, Compute, and Storage.',
    lessons: [
      { id: 'entra', title: 'Managing Azure Identities', file: 'azure104/entra.md' },
      { id: 'networking', title: 'Virtual Networking', file: 'azure104/networking.md' },
      { 
        id: 'compute', 
        title: 'Compute Resources', 
        file: 'azure104/compute.md',
        lab: {
          title: 'Resource Sizing',
          objective: 'Use the Azure CLI to list all virtual machines in your subscription in a clean table format.',
          hint: 'az vm list ... -o table',
          validate: (val) => val.toLowerCase().includes('az vm list') && val.toLowerCase().includes('-o table')
        }
      },
      { id: 'storage', title: 'Storage Accounts', file: 'azure104/storage.md' },
    ],
  },
];

export const getLessonByPath = (moduleId, lessonId) => {
  const module = courseMap.find((m) => m.id === moduleId);
  if (!module) return null;
  const lesson = module.lessons.find((l) => l.id === lessonId);
  return { module, lesson };
};
