interface UserProps {
  id: string;
  name: string;
  phone: string;
  isAdmin?: boolean;
  verified: boolean;
}

export class User {
  constructor(private props: UserProps) {}

  get phone() {
    return this.props.phone;
  }

  get verified() {
    return this.props.verified;
  }

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }
}
