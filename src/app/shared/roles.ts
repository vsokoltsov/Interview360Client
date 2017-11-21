export function getRole(roleObject: { role: number }) {
  switch(roleObject.role) {
    case 1:
      return { name: 'CEO', icon: 'icon-ceo' };
    case 2:
      return { name: 'Human Resources', icon: 'icon-hr' };
    case 3:
      return { name: 'Candidate', icon: 'icon-candidate' };
    case 4:
      return { name: 'Employee', icon: 'icon-employee' };
    default:
      return { name: 'Employee', icon: 'icon-employee' };
  }
}
