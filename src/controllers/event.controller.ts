import { Request, Response, NextFunction } from "express";
import Event from "../models/event.model";
import { errorHandler } from "../utils/error";
import User from "../models/user.model";

interface IEvent {
    title: string;
    description: string;
    date: string;
    time: string;
    duration: string;
    location: string;
    attendees: string;
    image: string;
}

export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, date, time, duration, location, attendees, image }: IEvent = req.body;
    const { owner } = req.params;

    try {
        const event = new Event({
            title,
            description,
            date,
            time,
            duration,
            location,
            attendees,
            image,
            owner
        });

        await event.save();

        res.status(201).json(event);

    } catch (error) {
        next(error);
    }
}

export const getEvents = async (req: Request, res: Response, next: NextFunction) => {
    const { owner } = req.params;
    try {
        const events = await Event.find({ owner });
        if (!events) {
            return next(errorHandler(404, "No events found"));
        }

        const eventsToReturn = await Promise.all(events.map(async (event) => {
            const user = await User.findOne({ username: event.owner });
            if(!user) {
                return next(errorHandler(404, "Cannot find the owner of this event"));
            }
            return {
                ...event.toObject(), profilePicture: user.profilePicture, name: user.name
            };
        }));

        res.status(200).json(eventsToReturn);
    } catch (error) {
        next(error);
    }
}

export const followEvent = async (req: Request, res: Response, next: NextFunction) => {
    const {eventid, username} = req.params;
    try {
        const event = await Event.findById(eventid);
        if(!event) {
            return next(errorHandler(404, "Event not found"));
        }
        const userIndex = event.followers.indexOf(username);
        if(userIndex === -1){
            event.followers.push(username);
        } else{
            event.followers.splice(userIndex, 1);
        }
        await event.save();
        res.status(200).json(event.followers);
    } catch (error) {
        next(error);
    }
}

export const likeEvent = async (req: Request, res: Response, next: NextFunction) => {
    const {eventid, username} = req.params;
    try {
        const event = await Event.findById(eventid);
        if(!event) {
            return next(errorHandler(404, "Event not found"));
        }
        const userIndex = event.likes.indexOf(username);
        if(userIndex === -1){
            event.likes.push(username);
        } else{
            event.likes.splice(userIndex, 1);
        }
        await event.save();
        res.status(200).json(event.likes);
    } catch (error) {
        next(error);
    }
}