import { Button, Input, Modal, Toast, Loader } from "../components/ui";

function Dashboard() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Component Showcase</h1>

      <Input label="Search Reviews" type="text" placeholder="Enter review..." />

      <Button text="Analyze" />

      <Modal title="Sample Modal">
        <p>This is modal content.</p>
      </Modal>

      <Toast message="Review analyzed successfully!" />

      <Loader />
    </div>
  );
}

export default Dashboard;