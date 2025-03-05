import { Modal, Table, Button, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { HiPlus } from "react-icons/hi2"; // Import the plus icon
import RegisterTicket from "../pages/RegisterTicket";
import useApiFetch from "../utils/apiMiddleware";

export default function DashTickets() {
  const { currentUser } = useSelector((state) => state.user);
  const [userTickets, setUserTickets] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [ticketIdToDelete, setTicketIdToDelete] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // For the create ticket modal
  const [ticketIdToUpdate, setTicketIdToUpdate] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [showStatusModal, setShowStatusModal] = useState(false);
  const apiFetch = useApiFetch();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await apiFetch(
          currentUser.isAdmin
            ? `/ticket/gettickets`
            : `/ticket/gettickets?userId=${currentUser._id}`
        );
        const data = await res.json();
        if (res.ok) {
          setUserTickets(data.tickets);
          if (data.tickets.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchTickets();
  }, [currentUser]);

  const handleShowMore = async () => {
    const startIndex = userTickets.length;
    try {
      const res = await apiFetch(
        currentUser.isAdmin
          ? `/ticket/gettickets?startIndex=${startIndex}`
          : `/ticket/gettickets?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserTickets((prev) => [...prev, ...data.tickets]);
        if (data.tickets.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteTicket = async () => {
    setShowModal(false);
    try {
      const res = await apiFetch(
        `/ticket/deleteticket/${ticketIdToDelete}/${currentUser._id}`,
        "DELETE"
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserTickets((prev) =>
          prev.filter((ticket) => ticket._id !== ticketIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const openStatusModal = (ticketId, currentStatus) => {
    setTicketIdToUpdate(ticketId);
    setNewStatus(currentStatus);
    setShowStatusModal(true);
  };

  const handleStatusChange = async () => {
    try {
      const res = await apiFetch(
        `/ticket/updateticket/${ticketIdToUpdate}`,
        "PUT",
        { status: newStatus }
      );
      const data = await res.json();
      if (res.ok) {
        setUserTickets((prev) =>
          prev.map((ticket) =>
            ticket._id === ticketIdToUpdate
              ? { ...ticket, status: newStatus }
              : ticket
          )
        );
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
    setShowStatusModal(false);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <div className="flex justify-end mb-4">
        <Button gradientDuoTone="purpleToBlue" onClick={openModal}>
          <HiPlus className="mr-2 h-5 w-5" /> {/* Add the plus icon */}
          Add New Ticket
        </Button>
      </div>

      {/* Create Ticket Modal */}
      <Modal show={isModalOpen} onClose={closeModal} size="md">
        <Modal.Header />
        <Modal.Body>
          <RegisterTicket closeModal={closeModal} />
          <Button onClick={closeModal}>Close</Button>
        </Modal.Body>
      </Modal>

      {userTickets.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Ticket Title</Table.HeadCell>
              {/* <Table.HeadCell>Created By</Table.HeadCell> */}
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
              <Table.HeadCell>Quantity</Table.HeadCell>
              <Table.HeadCell>Created Date</Table.HeadCell>
              <Table.HeadCell>Created Time</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              {currentUser.isAdmin && (
                <Table.HeadCell>Change Status</Table.HeadCell>
              )}
              {/* <Table.HeadCell>Delete</Table.HeadCell> */}
            </Table.Head>
            {userTickets.map((ticket) => (
              <Table.Body className="divide-y" key={ticket._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(ticket.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="font-medium text-gray-900 dark:text-white"
                      to={`/ticket-details/${ticket._id}`}
                    >
                      {ticket.title}
                    </Link>
                  </Table.Cell>
                  {/* <Table.Cell>
                    {ticket.userId.email === null
                      ? ticket.userId.username
                      : ticket.userId.email}
                  </Table.Cell> */}
                  {/* Display user email */}
                  <Table.Cell>{ticket.category}</Table.Cell>
                  <Table.Cell>${ticket.price.toFixed(2)}</Table.Cell>
                  <Table.Cell>{ticket.quantity}</Table.Cell>
                  <Table.Cell>
                    {new Date(ticket.eventDate).toISOString().split("T")[0]}
                  </Table.Cell>
                  <Table.Cell>{ticket.eventTime}</Table.Cell>
                  <Table.Cell>{ticket.status}</Table.Cell>
                  {currentUser.isAdmin && (
                    <Table.Cell>
                      <Button
                        onClick={() =>
                          openStatusModal(ticket._id, ticket.status)
                        }
                        color="info"
                      >
                        Change Status
                      </Button>
                    </Table.Cell>
                  )}
                  {/* <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setTicketIdToDelete(ticket._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell> */}
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no tickets yet!</p>
      )}

      {/* Change Status Confirmation Modal */}
      <Modal
        show={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to change the status of this ticket?
            </h3>
            <Select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="mb-4"
            >
              <option value="Registered">Registered</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </Select>
            <div className="flex justify-center gap-4">
              <Button color="success" onClick={handleStatusChange}>
                Yes, Change Status
              </Button>
              <Button color="gray" onClick={() => setShowStatusModal(false)}>
                No, Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this ticket?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteTicket}>
                Yes, I&apos;m sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
