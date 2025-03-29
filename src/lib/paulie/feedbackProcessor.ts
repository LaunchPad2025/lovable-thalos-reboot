export interface Feedback {
    userId: string;
    message: string;
    timestamp: Date;
}

export class FeedbackProcessor {
    private feedbackList: Feedback[] = [];

    addFeedback(feedback: Feedback): void {
        this.feedbackList.push(feedback);
    }

    getFeedbackByUser(userId: string): Feedback[] {
        return this.feedbackList.filter(feedback => feedback.userId === userId);
    }

    getAllFeedback(): Feedback[] {
        return this.feedbackList;
    }
}
