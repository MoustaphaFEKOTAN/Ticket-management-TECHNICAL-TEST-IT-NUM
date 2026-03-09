package com.fekotan.ticketapp.service;

import com.fekotan.ticketapp.dto.CreateTicketRequest;
import com.fekotan.ticketapp.dto.UpdateTicketRequest;
import com.fekotan.ticketapp.entity.Ticket;
import com.fekotan.ticketapp.entity.User;
import com.fekotan.ticketapp.repository.TicketRepository;
import com.fekotan.ticketapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;

    // récupérer l'user connecté depuis le token
    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // créer un ticket
    public Ticket createTicket(CreateTicketRequest request) {
        User currentUser = getCurrentUser();
        Ticket ticket = new Ticket();
        ticket.setTitle(request.getTitle());
        ticket.setDescription(request.getDescription());
        ticket.setUser(currentUser);
        return ticketRepository.save(ticket);
    }

    // voir les tickets selon le rôle
    public List<Ticket> getTickets() {
        User currentUser = getCurrentUser();
        if (currentUser.getRole().name().equals("ADMIN")) {
            return (List<Ticket>) ticketRepository.findAll();
        }
        return ticketRepository.findByUserId(currentUser.getId());
    }

    // voir un ticket
    public Ticket getTicketById(Long id) {
        User currentUser = getCurrentUser();
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        if (!ticket.getUser().getId().equals(currentUser.getId())
                && !currentUser.getRole().name().equals("ADMIN")) {
            throw new RuntimeException("Access denied");
        }
        return ticket;
    }

    // modifier un ticket
    public Ticket updateTicket(Long id, UpdateTicketRequest request) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        User currentUser = getCurrentUser();
        if (!ticket.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Access denied");
        }

        ticket.setTitle(request.getTitle());
        ticket.setDescription(request.getDescription());
        return ticketRepository.save(ticket);
    }

    // supprimer un ticket
    public void deleteTicket(Long id) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        User currentUser = getCurrentUser();
        if (!ticket.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Access denied");
        }

        ticketRepository.delete(ticket);
    }
}