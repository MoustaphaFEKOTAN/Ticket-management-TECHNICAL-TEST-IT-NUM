package com.fekotan.ticketapp.repository;

import org.springframework.data.repository.CrudRepository;

import com.fekotan.ticketapp.entity.Ticket;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface TicketRepository extends CrudRepository<Ticket, Long> {

}