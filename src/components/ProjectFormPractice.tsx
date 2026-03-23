import '@/styles/TaskForm.css';
import { useState } from 'react';

const TYPE_PROJECT = {
  ADMIN: 'admin',
  GAMING: 'gaming',
  SHOP: 'shop',
  TRAVEL: 'travel',
} as const;
type TypeProject = (typeof TYPE_PROJECT)[keyof typeof TYPE_PROJECT];

interface ProjectTypeOption {
  value: TypeProject;
  label: string;
}
const typeList: ProjectTypeOption[] = [
  {
    value: TYPE_PROJECT.ADMIN,
    label: 'Admin',
  },
  {
    value: TYPE_PROJECT.GAMING,
    label: 'Gaming',
  },
  {
    value: TYPE_PROJECT.SHOP,
    label: 'Shop',
  },
  {
    value: TYPE_PROJECT.TRAVEL,
    label: 'Travel',
  },
];

export interface ProjectFormValues {
  title: string;
  description: string;
  type: TypeProject;
}

interface ProjectFormPracticeProp {
  onCreate: (project: ProjectFormValues) => void;
}

const DEFAULT_PROJECT_VALUES: ProjectFormValues = {
  title: '',
  description: '',
  type: TYPE_PROJECT.GAMING,
};

export function ProjectFormPractice({ onCreate }: ProjectFormPracticeProp) {
  const [project, setProject] = useState(DEFAULT_PROJECT_VALUES);

  const handleSave = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    onCreate(project);
  };
  return (
    <section className="task-form">
      <h2 className="task-form__title">Create Project</h2>
      <form onSubmit={handleSave} className="task-form__form">
        <div className="task-form__field">
          <label htmlFor="title" className="task-form__label">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={project.title}
            onChange={(e) =>
              setProject((prev) => ({ ...prev, title: e.target.value }))
            }
            className="task-form__control"
          />
        </div>

        <div className="task-form__field">
          <label htmlFor="description" className="task-form__label">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={project.description}
            onChange={(e) =>
              setProject((prev) => ({ ...prev, description: e.target.value }))
            }
            className="task-form__control task-form__textarea"
          />
        </div>

        <div className="task-form__field">
          <label htmlFor="type" className="task-form__label">
            Type
          </label>
          <select
            id="type"
            value={project.type}
            onChange={(e) =>
              setProject((prev) => ({
                ...prev,
                type: e.target.value as TypeProject,
              }))
            }
            className="task-form__control"
          >
            {typeList.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="task-form__submit">
          Add project
        </button>
      </form>
    </section>
  );
}
