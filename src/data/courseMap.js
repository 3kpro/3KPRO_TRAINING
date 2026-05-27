export const courseMap = [
  {
    id: 'devops',
    title: 'DevOps',
    description: 'Learn Version Control, CI/CD, Docker, and Kubernetes.',
    lessons: [
      { id: 'git', title: 'Version Control (Git)', file: 'devops/git.md' },
      { id: 'cicd', title: 'CI/CD Pipelines', file: 'devops/cicd.md' },
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
      { id: 'terraform', title: 'Terraform Basics & State', file: 'iac/terraform.md' },
      { id: 'bicep', title: 'Azure Bicep Fundamentals', file: 'iac/bicep.md' },
    ],
  },
  {
    id: 'python',
    title: 'Python',
    description: 'Syntax, Scripting, and APIs.',
    lessons: [
      { id: 'syntax', title: 'Syntax & Data Structures', file: 'python/syntax.md' },
      { id: 'scripting', title: 'Automation & Scripting', file: 'python/scripting.md' },
      { id: 'apis', title: 'API Interactions (Requests)', file: 'python/apis.md' },
    ],
  },
  {
    id: 'scripting',
    title: 'PowerShell & Bash',
    description: 'Master cross-platform scripting and OS management.',
    lessons: [
      { id: 'core', title: 'Core Cmdlets/Commands', file: 'scripting/core.md' },
      { id: 'pipeline', title: 'Pipeline Manipulation', file: 'scripting/pipeline.md' },
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
      { id: 'compute', title: 'Compute Resources', file: 'azure104/compute.md' },
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
